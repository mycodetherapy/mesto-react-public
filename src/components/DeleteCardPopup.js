import React from "react";
import PopupWithForm from "./PopupWithForm";

function DeleteCardPopup({ isOpen, onClose, onDeleteCard }) {
  function handleSubmit(e) {
    e.preventDefault();
    onDeleteCard();
  }

  return (
    <PopupWithForm
      name="delete-element"
      title="Вы уверены?"
      buttonText="Да"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    ></PopupWithForm>
  );
}

export default DeleteCardPopup;
