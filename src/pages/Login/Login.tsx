import { useState } from "react";
import { UserAPI } from "../../store/API/UserAPI";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { authSlice } from "../../store/Slices/AuthSlice";
import { useAppDispatch } from "../../hooks/redux";
import LoginForm from "../../components/LoginForm/LoginForm";
import { FormProps } from "../../components/LoginForm/LoginForm";

const Login = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<string>("login");
  const [alert, setAlert] = useState<boolean>(false);
  const [alertText, setAlertText] = useState<string>("error");

  const dispatch = useAppDispatch();
  const { approveAuthorization } = authSlice.actions;

  const [ckeckLogin, { isLoading: isLoadingLogin }] = UserAPI.useLazyGetUserQuery();
  const [addUser, { isError: isErrorRegistration, isLoading: isLoadingUser }] = UserAPI.useAddUserMutation();

  const isLoading = isLoadingLogin || isLoadingUser;

  const approveAuth = (login: string, newUserId: string) => {
    dispatch(approveAuthorization({ user: login, userId: newUserId }));
    navigate(`/account`);
  };

  const changeMode = () => (mode === "login" ? setMode("registration") : setMode("login"));

  const showAlert = (text: string, timer: boolean) => {
    setAlertText(text);
    setAlert(true);

    if (timer) {
      setTimeout(() => {
        setAlert(false);
      }, 1000);
    }
  };

  const onFinish = async (values: FormProps) => {
    mode === "login" ? logining(values.login, values.password) : registration(values.login, values.password);
  };

  const logining = async (login: string, password: string) => {
    try {
      const { data: serverData, isError: isErrorLogining } = await ckeckLogin(login);

      // Ошибка - url
      if (isErrorLogining) {
        showAlert("Сервис недоступен", false);
        return;
      }

      // Ошибка - пришел undefined
      if (!serverData) {
        showAlert("Неверные данные", true);
        return;
      }

      if (serverData.login === login && serverData.password === password) approveAuth(login, serverData.id);
      navigate(`/account`);
    } catch (e) {
      console.log(e);
      showAlert("Ошибка", false);
    }
  };

  const registration = async (login: string, password: string) => {
    try {
      // Тест логина и пароля - только латинские буквы, с цифрамы, от 1 до 20 символов (1 символ - буква)
      const testData = (string: string): boolean => /^[a-zA-Z1-9]$/.test(string) !== false;

      if (testData(login) || testData(password)) {
        showAlert("Недопустимый логин и/или пароль", true);
        return;
      }

      const { data: serverData } = await ckeckLogin(login);
      console.log(serverData);
      if (serverData) {
        showAlert("Логин занят", true);
        return;
      }

      const newUserId = uuidv4();
      await addUser({
        id: newUserId,
        login: login,
        password: password,
      });

      isErrorRegistration ? showAlert("Попробуйте снова", false) : approveAuth(login, newUserId);
    } catch (e) {
      showAlert("Сервис недоступен", true);
    }
  };

  return (
    <LoginForm
      changeMode={changeMode}
      mode={mode}
      onFinish={onFinish}
      alert={alert}
      alertText={alertText}
      isLoading={isLoading}
    />
  );
};

export default Login;
