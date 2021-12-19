import React from "react";

function AuthForm(props) {
  const [email, setemail] = React.useState("");
  const [password, setpassword] = React.useState("");

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onSubmit(password, email);
    resetForm();
  }
  function handleEmailChange(evt) {
    setemail(evt.target.value);
  }
  function handlePasswordChange(evt) {
    setpassword(evt.target.value);
  }
  function resetForm() {
    setemail("");
    setpassword("");
  }

  return (
    <form
      action="#"
      className={`form form_theme_dark form_type_${props.name}`}
      name={props.name}
      onSubmit={handleSubmit}
    >
      <h2 className="form__title form__title_theme_dark">{props.title}</h2>
      <input
        type="email"
        placeholder="Email"
        className="form__input form__input_theme_dark"
        id="input-email"
        name="email"
        required
        minLength="2"
        maxLength="30"
        autoComplete="off"
        value={email}
        onChange={handleEmailChange}
      />
      <span className="form__error" id="input-place-error"></span>
      <input
        type="password"
        placeholder="Пароль"
        className="form__input form__input_theme_dark"
        id="input-password"
        name="password"
        required
        autoComplete="off"
        value={password}
        onChange={handlePasswordChange}
      />
      <span className="form__error" id="input-link-error"></span>
      <button
        className="button form__submit-button form__submit-button_theme_dark"
        type="submit"
      >
        {props.buttonText}
      </button>
      {props.children}
    </form>
  );
}
export default AuthForm;
