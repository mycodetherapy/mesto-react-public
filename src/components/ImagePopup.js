function ImagePopup({card, onClose}) {
  
const isCard = Boolean(JSON.stringify(card) ==='{}');
const className = !isCard && "popup_opened";

    return(
        <div className={`popup popup_type_image ${className}`}>
        <figure
          className="popup__container popup__container-for-image"
          tabIndex="0"
        >
          <button className="popup__close" type="button" onClick={onClose}></button>
          <img
            className="popup__element-image"
            src={card.link}
            alt={card.name}
          />
          <figcaption className="popup__image-caption">{card.name}</figcaption>
        </figure>
      </div>
    )
}

export default ImagePopup