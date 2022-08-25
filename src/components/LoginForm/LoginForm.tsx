import "./LoginForm.scss";
import React from "react";
import { Alert, Button, Form, Input } from "antd";
import { UserOutlined, LockOutlined, UserAddOutlined, LoadingOutlined } from "@ant-design/icons";

interface LoginFormProps {
  onFinish: (values: FormProps) => Promise<void>;
  changeMode: () => void;
  mode: string;
  alert: boolean;
  alertText: string;
  isLoading: boolean
}

export interface FormProps {
  login: string;
  password: string;
}

const LoginForm: React.FC<LoginFormProps> = ({
  onFinish,
  changeMode,
  mode,
  alert,
  alertText,
  isLoading
}) => {
  return (
    <div className="login-page">
      {mode === 'login' && <UserOutlined className='login-icon' />}
      {mode === 'registration' && <UserAddOutlined  className='login-icon'/> }
      <Form
        className="login-form"
        initialValues={{ login: "", password: "" }}
        onFinish={onFinish}
      >
        <Form.Item
          name="login"
          rules={[{ required: true, message: "Введите логин" }]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder="Логин"
            autoComplete="username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Введите пароль" }]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="Пароль"
            autoComplete="current-password"
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            {mode === "login" ? "Войти" : "Зарегистрироваться"}
          </Button>
          <Button
            type="link"
            onClick={changeMode}
            htmlType="button"
            className="login-form-button-mode"
          >
            {mode === "login" ? "зарегистрироваться" : "войти"}
          </Button>
        </Form.Item>
      </Form>
      {isLoading && <LoadingOutlined className="login-loading"/>}
      {alert && (
        <Alert
          message={alertText}
          type="error"
          showIcon
          className="login-alert"
        />
      )}
    </div>
  );
};

export default LoginForm;
