import React from "react";
import { Link, Route } from 'react-router-dom';

function WelcomeForm({
  name,
  title,
  buttonText,
  bottomLinkText,
  linkPuth,
  onSubmit,
  onEmail,
  onPassword,
  password,
  email,
}) {
  return (
    <div className="welcome">
      <form
        name={name}
        className="welcome__form"
        onSubmit={onSubmit}
        noValidate
      >
        <fieldset className="welcome__input-container">
          <h2 className="welcome__title">{title}</h2>
          <label className="welcome__label" htmlFor="username">
            <input
              className="welcome__input"
              id="username"
              name="username"
              type="text"
              placeholder="Email"
              onChange={onEmail}
              value={email || ""}
            ></input>
          </label>
          <label className="welcome__label" htmlFor="password">
            <input
              className="welcome__input"
              id="password"
              name="password"
              type="password"
              placeholder="Пароль"
              onChange={onPassword}
              value={password}
            ></input>
          </label>
        </fieldset>
        <button className="welcome__button" type="submit">
          {buttonText}
        </button>
        <Route path={"/sign-up"}>
          <Link to="sign-in" className="welcome__link-bottom">
            {bottomLinkText}
          </Link>
        </Route>
      </form>
    </div>
  );
}

export default WelcomeForm;
