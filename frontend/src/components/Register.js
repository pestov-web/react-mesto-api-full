import React from "react";
import AuthForm from "./AuthForm";
import { Link } from "react-router-dom";
function Register(props) {
  return (
    <AuthForm
      name="register"
      title="Регистрация"
      buttonText="Зарегистрироваться"
      onSubmit={props.onRegister}
    >
      <Link to="/sign-in" className="form__link">
        Уже зарегистрированы? Войти
      </Link>
    </AuthForm>
  );
}
export default Register;
