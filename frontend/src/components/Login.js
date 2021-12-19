import React from "react";
import AuthForm from "./AuthForm";

function Login(props) {
  return (
    <AuthForm
      name="login"
      title="Вход"
      buttonText="Войти"
      onSubmit={props.onLogin}
    />
  );
}
export default Login;
