import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({onAddPlace, isOpen, onClose}) {
    const [name, setName] = React.useState("");
    const [link, setLink] = React.useState("");
    
    function handleNameChange(e) {
      setName(e.target.value);
    }

    function handleLinkChange(e) {
      setLink(e.target.value);
    }

    function handleAddPlaceSubmit(e) {
        e.preventDefault();
        onAddPlace({name, link});
    }

    React.useEffect(() => {
        setName("");
        setLink(""); 
     }, [isOpen]);

    return(
        <PopupWithForm
            name="creat-element"
            title="Новое место"
            buttonText="Сохранить"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleAddPlaceSubmit}
          >
            <label className="form__field">
              <input
                name="name"
                type="text"
                className="form__input form__input_type_place"
                placeholder="Название"
                id="input-place"
                minLength="2"
                maxLength="30"
                required
                onChange={handleNameChange}
                value={name}
              />
              <span className="form__input-error input-place-error"></span>
            </label>
            <label className="form__field">
              <input
                name="link"
                type="url"
                className="form__input form__input_type_place-link"
                placeholder="Ссылка на картинку"
                id="input-place-link"
                required
                onChange={handleLinkChange}
                value={link}
              />
              <span className="form__input-error input-place-link-error"></span>
            </label>
          </PopupWithForm>
    )
}

export default AddPlacePopup;