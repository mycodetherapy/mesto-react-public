import React from "react";
import Card from "./Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({
  cards,
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardLike,
  onCardDelete,
}) {
  const userData = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <img className="profile__avatar" src={userData.avatar} alt="аватар" />
        <div className="profile__hidden-avatar" onClick={onEditAvatar}></div>
        <div className="profile__info">
          <h1 className="profile__title">{userData.name}</h1>
          <button
            className="profile__button"
            type="button"
            onClick={onEditProfile}
          ></button>
          <p className="profile__subtitle">{userData.about}</p>
        </div>
        <button
          className="profile__button-add"
          type="button"
          aria-label="добавить_элемент"
          onClick={onAddPlace}
        ></button>
      </section>

      <section className="elements">
        <ul className="elements__grid-container">
          {cards.map((card) => (
            <Card
              key={card._id}
              name={card.name}
              link={card.link}
              likes={card.likes}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
