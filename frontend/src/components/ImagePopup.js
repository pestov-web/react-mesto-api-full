function ImagePopup(props) {
  return (
    <div
      className={
        "popup popup_type_image" + (props.isOpen ? " popup_opened" : "")
      }
      onClick={props.onOverlayClick}
    >
      <div className="popup__container">
        <button
          onClick={props.onClose}
          className="button popup__close-button"
          type="button"
          aria-label="закрыть"
        ></button>
        <img
          src={props.card.link}
          alt={props.card.name}
          className="popup__image"
        />
        <h2 className="form__title form__title_type_image">
          {props.card.name}
        </h2>
      </div>
    </div>
  );
}

export default ImagePopup;
