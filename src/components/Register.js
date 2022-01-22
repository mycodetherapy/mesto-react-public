import React from "react";
import WelcomeForm from "./WelcomeForm";
import * as Auth from "./Auth";
import { useHistory } from "react-router";

function Register() {
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
    let {email, password} = registerData;
    console.log(email, password);
    Auth.register(password, email).then((res) => {
      if (res) {
        console.log(res);
        history.push("/sign-in");
      } else {
        console.log("Что-то пошло не так!");
      }
    });
  }

  return (
    <WelcomeForm
      name="register-form"
      title="Регистрация"
      buttonText="Зарегистрироваться"
      bottomLinkText="Уже зарегистрированы? Войти"
      linkPuth="/sign-in"
      onEmail={handleEmailChange}
      onPassword={handlePasswordChange}
      onSubmit={handleSubmit}
      password={registerData.password}
      email={registerData.email}
    ></WelcomeForm>
  );
}

export default Register;
