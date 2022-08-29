import { useState } from "react";
import { UserAPI } from "../../store/API/UserAPI";
import { useNavigate } from "react-router-dom";
import { ILogin } from "../../model/ILogin";
import { IAccount, IContacts } from "../../model/IAccount";
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

  const [ckeckLogin, { isLoading: isLoadingLogin }] =
    UserAPI.useLazyGetLoginQuery();
  const [addUser, { isError: isErrorRegistration, isLoading: isLoadingUser }] =
    UserAPI.useAddUserMutation();
  const [addAccount, { isError: isErrorAccount, isLoading: isLoadingAccaunt }] =
    UserAPI.useAddAccountMutation();

  const isLoading = isLoadingLogin || isLoadingUser || isLoadingAccaunt;

  const approveAuth = (login: string) => dispatch(approveAuthorization(login));

  const changeMode = () =>
    mode === "login" ? setMode("registration") : setMode("login");

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
    mode === "login"
      ? logining(values.login, values.password)
      : registration(values.login, values.password);
  };

  const logining = async (login: string, password: string) => {
    try {
      const { data: serverData, isError: isErrorLogining } = await ckeckLogin(
        login
      );

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

      if (serverData.login === login && serverData.password === password)
        approveAuth(login);
      navigate(`/account`);
    } catch (e) {
      console.log(e);
      showAlert("Ошибка", false);
    }
  };

  const registration = async (login: string, password: string) => {
    try {
      // Тест логина и пароля - только латинские буквы, с цифрамы, от 1 до 20 символов (1 символ - буква)
      const testData = (string: string) =>
        /^[a-zA-Z1-9]{1,}$/.test(string) === false;

      // Нужна проверка - существует ли такой же логин

      if (testData(login) || testData(password)) {
        showAlert("Недопустимый логин и/или пароль", true);
        return;
      }

      await addUser({ login: login, password: password } as ILogin);
      await addAccount({
        user: login,
        contacts: Array<IContacts>(),
      } as IAccount);

      isErrorAccount && console.error(`${login} - аккаунт не создан`);
      isErrorRegistration
        ? showAlert("Попробуйте снова", false)
        : approveAuth(login) && navigate(`/account`);
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
