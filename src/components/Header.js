import logo from "../images/logo.svg";
import close from "../images/close-icon-s.svg"
import React from 'react';
import { useHistory } from 'react-router-dom';


function Header({email, nameLink, handleNameLink, puth, classActive, classHidden}) {
  const history = useHistory();

  function signOut() {
    localStorage.removeItem("token");
    // handleNameLink("Регистрация");
    history.push("/sign-in");
  }

  return (
    <header className="header">
      <input className="header__navbar-menu" id="navbar-menu" type="checkbox" />
      <img className="header__logo" src={logo} alt="логотип" />
      <label className="header__navbar-close" htmlFor="navbar-menu">
          <img
            className="header__navbar-close-image"
            src={close}
            alt="Закрыть"
          />
        </label>
        <label className={`header__navbar-menu-label ${classHidden}`} htmlFor="navbar-menu">
          &#9776;
        </label>
       
      <div className={`header__navbar ${classActive}`}>
        <p className="header__navbar-email">{email}</p>
        <a href={puth} className="header__navbar-link" onClick={signOut}>
          {nameLink}
        </a>
      </div>
      
    </header>
  );
}

export default Header;
