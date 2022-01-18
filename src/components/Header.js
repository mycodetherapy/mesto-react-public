import logo from "../images/logo.svg";
import close from "../images/close-icon-s.svg"
import React from 'react';
import { Link, useHistory } from 'react-router-dom';


function Header() {
  const history = useHistory();

  function signOut() {
    localStorage.removeItem("token");
    history.push("/sign-in");
  }

  return (
    <header className="header">
      <input class="header__navbar-menu" id="navbar-menu" type="checkbox" />
      <img className="header__logo" src={logo} alt="логотип" />
      <label class="header__navbar-close" for="navbar-menu">
          <img
            className="header__navbar-close-image"
            src={close}
            alt="Закрыть"
          />
        </label>
        <label class="header__navbar-menu-label" for="navbar-menu">
          &#9776;
        </label>
       
      <div className="header__navbar">
        <p className="header__navbar-email">qwer</p>
        <a href="" className="header__navbar-link" onClick={signOut}>
          Выйти
        </a>
      </div>
      
    </header>
  );
}

export default Header;
