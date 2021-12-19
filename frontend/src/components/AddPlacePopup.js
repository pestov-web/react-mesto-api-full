import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [newCard, setNewCard] = React.useState({
    name: "",
    link: "",
  });

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onAddPlace(newCard);
    resetForm();
  }

  function handleNameChange(evt) {
    setNewCard({
      ...newCard,
      name: evt.target.value,
    });
  }

  function handleLinkChange(evt) {
    setNewCard({
      ...newCard,
      link: evt.target.value,
    });
  }

  function resetForm() {
    setNewCard({
      name: "",
      link: "",
    });
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      name="add"
      title="Новое место"
      buttonText="Создать"
      onOverlayClick={props.onOverlayClick}
    >
      <input
        type="text"
        placeholder="Название"
        className="form__input form__input_type_name"
        id="input-place"
        name="name"
        required
        minLength="2"
        maxLength="30"
        value={newCard.name}
        onChange={handleNameChange}
      />
      <span className="form__error" id="input-place-error"></span>
      <input
        type="url"
        placeholder="Ссылка на картинку"
        className="form__input form__input_type_link"
        id="input-link"
        name="link"
        required
        value={newCard.link}
        onChange={handleLinkChange}
      />
      <span className="form__error" id="input-link-error"></span>
    </PopupWithForm>
  );
}
export default AddPlacePopup;
