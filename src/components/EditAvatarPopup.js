import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {
    let avatarRef = React.useRef(null); 

    React.useEffect(() => {
      avatarRef.current.value = null;
   }, [isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
      
        onUpdateAvatar({
          avatar: avatarRef.current.value
        }, "setAvatar");
      } 

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="form__field">
        <input
          ref={avatarRef}
          name="avatar"
          type="url"
          className="form__input form__input_type_avatar"
          placeholder="Ссылка на аватар"
          id="profile-input-avatar"
          required
        />
        <span className="form__input-error profile-input-avatar-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
