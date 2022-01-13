function PopupWithForm({
  name,
  title,
  buttonText,
  isOpen,
  onClose,
  onSubmit,
  children,
}) {
  const className = isOpen && "popup_opened";

  return (
    <div className={`popup ${className}`}>
      <div className="popup__container" tabIndex="0">
        <button
          className="popup__close"
          type="button"
          onClick={onClose}
        ></button>
        <form name={name} className="form" onSubmit={onSubmit} noValidate>
          <fieldset className="form__input-container">
            <h2 className="form__title">{title}</h2>
            <>{children}</>
          </fieldset>
          <button className="form__button-save" type="submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
