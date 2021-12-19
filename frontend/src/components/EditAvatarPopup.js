import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const avatarRef = React.useRef();

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      name="avatar"
      title="Обновить аватар"
      buttonText="Сохранить"
      onOverlayClick={props.onOverlayClick}
    >
      <input
        type="url"
        placeholder="Ссылка на аватар"
        className="form__input form__input_type_avatar"
        id="input-avatar"
        name="avatar"
        required
        ref={avatarRef}
      />
      <span className="form__error" id="input-avatar-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
