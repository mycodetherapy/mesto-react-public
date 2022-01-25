import React from "react";
import WelcomeForm from "./WelcomeForm";
import * as Auth from "../utils/Auth";
import { useHistory } from "react-router";
import { withRouter } from "react-router-dom";

function Login({onLoggin, registerEmail}) {
  const [registerData, setRegisterData] = React.useState({email: "", password: ""});
  const history = useHistory();

  function handleEmailChange(e) {
    setRegisterData({...registerData, email: e.target.value});
  }

  function handlePasswordChange(e) {
    setRegisterData({...registerData, password: e.target.value});
  }

  function handleSubmit(e) {
    e.preventDefault();
    const {email, password} = registerData;
    Auth.authorization(password, email).then((data) => {
      if (data) {
        onLoggin();
        registerEmail(email);
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
      bottomLinkText=""
      onEmail={handleEmailChange}
      onPassword={handlePasswordChange}
      onSubmit={handleSubmit}
      password={registerData.password}
      email={registerData.email}
    ></WelcomeForm>
  );
}

export default withRouter(Login);
