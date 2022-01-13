import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [isOpen, currentUser]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleAboutChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name,
      about: description,
    }, "setUserInfo");
  }

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="form__field">
        <input
          name="name"
          type="text"
          className="form__input form__input_type_name"
          id="profile-input-name"
          placeholder="Введите имя"
          minLength="2"
          maxLength="40"
          required
          onChange={handleNameChange}
          value={name || ""}
        />
        <span className="form__input-error profile-input-name-error"></span>
      </label>
      <label className="form__field">
        <input
          name="about"
          type="text"
          className="form__input form__input_type_profession"
          id="profile-input-profession"
          placeholder="Коротко осебе"
          minLength="2"
          maxLength="200"
          required
          onChange={handleAboutChange}
          value={description || ""}
        />
        <span className="form__input-error profile-input-profession-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
