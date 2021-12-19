import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Card from "./Card";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <div className="profile__avatar-container">
          <img
            src={currentUser.avatar}
            alt="Аватар пользователя"
            className="profile__avatar"
          />
          <button
            onClick={props.onEditAvatar}
            className="profile__avatar-edit-button button"
          ></button>
        </div>

        <div className="profile__info">
          <h1 className="profile__info-title">{currentUser.name}</h1>
          <button
            onClick={props.onEditProfile}
            className="button profile__info-edit-button"
            type="button"
            aria-label="редактировать"
          ></button>
          <p className="profile__info-subtitle">{currentUser.about}</p>
        </div>
        <button
          onClick={props.onAddPlace}
          className="button profile__add-button"
          type="button"
          aria-label="добавить"
        ></button>
      </section>

      <section className="places">
        <ul className="places__cards">
          {props.cards.map((card) => (
            <Card
              card={card}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
              key={card._id}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
