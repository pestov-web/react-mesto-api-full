import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = props.card.owner._id === currentUser._id;
  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <li className="places__card">
      <button
        className={`button places__delete-button ${
          isOwn ? "" : " places__delete-button_hiden"
        }`}
        type="button"
        aria-label="Удалить"
        onClick={handleDeleteClick}
      ></button>
      <img
        onClick={handleClick}
        src={props.card.link}
        alt={props.card.name}
        className="places__image"
      />
      <div className="places__description">
        <h2 className="places__title">{props.card.name}</h2>
        <div className="places__like-container">
          <button
            className={`button places__like-button ${
              isLiked ? " places__like-button_active" : ""
            }`}
            type="button"
            aria-label="Нравится"
            onClick={handleLikeClick}
          ></button>
          <span className="places__like-counter">
            {props.card.likes.length}
          </span>
        </div>
      </div>
    </li>
  );
}

export default Card;
