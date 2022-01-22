import logo from "../images/logo.svg";
import close from "../images/close-icon-s.svg"
import React from 'react';
import { Link, Route, useHistory } from 'react-router-dom';

function Header({email}) {
  const history = useHistory();

  function signOut() {
    localStorage.removeItem("token");
    history.push("/sign-in");
  }

  return (
    <header className="header">
      
      <img className="header__logo" src={logo} alt="логотип" />
      <Route exact path={"/"}>
        <input className="header__navbar-menu" id="navbar-menu" type="checkbox" />
        <label className="header__navbar-close" htmlFor="navbar-menu">
          <img
            className="header__navbar-close-image"
            src={close}
            alt="Закрыть"
          />
        </label>
        <label className="header__navbar-menu-label" htmlFor="navbar-menu">
          &#9776;
        </label>

        <div className="header__navbar">
          <p className="header__navbar-email">{email}</p>
          <a href="" className="header__navbar-link" onClick={signOut}>
            "Выйти"
          </a>
        </div>
      </Route>
     
      <Route path={"/sign-up"}>
        <div className="header__navbar header__navbar_active">
          <Link to="sign-in" className="header__navbar-link">
            "Войти"
          </Link>
        </div>
      </Route>

      <Route path={"/sign-in"}>
        <div className="header__navbar header__navbar_active">
          <Link to="sign-up" className="header__navbar-link">
            "Регистрация"
          </Link>
        </div>
      </Route>

    </header>
  );
}

export default Header;
