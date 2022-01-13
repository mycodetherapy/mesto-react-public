import { CurrentUserContext } from "../contexts/CurrentUserContext";
import React from "react";

function Card({name, link, likes, card, onCardClick, onCardLike, onCardDelete}) {
  const userData = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === userData._id;
  const elementDeleteClassName = `element__delete ${
    isOwn ? "element__delete_visible" : "element__delete_hidden"
  }`;

  const isLiked = card.likes.some((i) => i._id === userData._id);

  const elementLikeClassName = `element__like ${
    isLiked && "element__like_active"
  }`;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="element">
      <button
        className={elementDeleteClassName}
        onClick={handleDeleteClick}
      ></button>
      <div className="element__image-container">
        <img
          className="element__image"
          src={link}
          alt={name}
          onClick={handleClick}
        />
      </div>
      <h2 className="element__title">{name}</h2>
      <div className="element__like-container">
        <button
          className={elementLikeClassName}
          type="submit"
          onClick={handleLikeClick}
        ></button>
        <div className="element__like-counter">{likes.length}</div>
      </div>
    </li>
  );
}

export default Card;
