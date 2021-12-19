import { NavLink, useLocation } from "react-router-dom";

function Header(props) {
  const location = useLocation();

  return (
    <header className="header">
      <div className="header__logo"></div>
      {props.loggedIn && (
        <div className="header__container">
          <address className="header__user-email">{props.userEmail}</address>

          <button className="header__button" onClick={props.onSingOut}>
            Выйти
          </button>
        </div>
      )}

      {!props.loggedIn && (
        <>
          {location.pathname === "/sign-in" && (
            <NavLink className="header__link" to="/sign-up">
              Регистрация
            </NavLink>
          )}
          {location.pathname === "/sign-up" && (
            <NavLink className="header__link" to="/sign-in">
              Войти
            </NavLink>
          )}
        </>
      )}
    </header>
  );
}

export default Header;
