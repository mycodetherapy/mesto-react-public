import React from "react";
import WelcomeForm from "./WelcomeForm";
import * as Auth from "./Auth";
import { useHistory } from "react-router";
import { withRouter } from 'react-router-dom';

function Login({handleLoggin}) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const history = useHistory();

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(email, password);
    Auth.authorization(password, email).then((data) => {
      if (data) {
        console.log(data);
        handleLoggin();
        history.push("/");
      } else {
        console.log("Что-то пошло не так!");
      }
    });
  }

  return (
    <WelcomeForm
      name="login-form"
      title="Вход"
      buttonText="Войти"
      topLinkText="Регистрация"
      bottomLinkText=""
      onEmail={handleEmailChange}
      onPassword={handlePasswordChange}
      onSubmit={handleSubmit}
      password={password}
      email={email}
    ></WelcomeForm>
  );
}

export default withRouter (Login);
