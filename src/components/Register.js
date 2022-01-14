import React from "react";
import WelcomeForm from "./WelcomeForm";

function Register() {
const [email, setEmail] = React.useState("");
const [password, setPassword] = React.useState("");

function handleUsernameChange(e) {
  setEmail(e.target.value);
}

function handlePasswordChange(e) {
  setPassword(e.target.value);
}

  return (
    <WelcomeForm
    name="register-form"
    title="Регистрация"
    buttonText="Зарегистрироваться"
    topLinkText="Войти"
    bottomLinkText="Уже зарегистрированы? Войти"
    username={email}
    password={password}
    // onSubmit={handleSubmit}
    >
    </WelcomeForm>
  );
}

export default Register;
