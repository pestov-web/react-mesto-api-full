import error from "../images/popup/Union.svg";
import succes from "../images/popup/icon.svg";

function InfoTooltip(props) {
  return (
    <div
      className={`popup` + (props.isOpen ? " popup_opened" : "")}
      onClick={props.onOverlayClick}
    >
      <div className="popup__container">
        <button
          onClick={props.onClose}
          className="button popup__close-button"
          type="button"
          aria-label="закрыть"
        ></button>

        <div className="tooltip__container">
          {!props.isRegisterSucces && (
            <>
              <img src={error} alt="инонка неудачи" />
              <span className="tooltip__text">
                Что-то пошло не так! Попробуйте ещё раз.
              </span>
            </>
          )}
          {props.isRegisterSucces && (
            <>
              <img src={succes} alt="иконка удачи" />
              <span className="tooltip__text">
                Вы успешно зарегистрировались!
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default InfoTooltip;
