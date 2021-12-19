function PopupWithForm(props) {
  return (
    <div
      className={
        `popup popup_type_${props.name}` + (props.isOpen ? " popup_opened" : "")
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
        <form
          action="#"
          className={`form form_type_${props.name}`}
          name={props.name}
          onSubmit={props.onSubmit}
        >
          <h2 className="form__title">{props.title}</h2>

          {props.children}

          <button className="button form__submit-button" type="submit">
            {props.buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
