import React from "react";
import WelcomeForm from "./WelcomeForm";
import * as Auth from "./Auth";
import { useHistory } from "react-router";

function Register({
  handleNameLink,
  handlePuth,
  handleNavbarActive,
  handleNavbarMenuHidden,
}) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const history = useHistory();

  handleNameLink("Войти");
  handlePuth("/sign-in");
  handleNavbarActive("header__navbar_active");
  handleNavbarMenuHidden("header__navbar-menu-label_hidden");

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
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
      password={password}
      email={email}
    ></WelcomeForm>
  );
}

export default Register;
