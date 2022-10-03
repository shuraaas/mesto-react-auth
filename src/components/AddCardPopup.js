import React, { useRef } from 'react';
import PopupWithForm from './PopupWithForm';

const AddCardPopup = ({ isOpen, onClose, onAddCard }) => {
  const nameRef = useRef();
  const linkRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddCard({
      name: nameRef.current.value,
      link: linkRef.current.value
    });
    nameRef.current.value = '';
    linkRef.current.value = '';
  };

  return (
    <PopupWithForm
      title="Новое место"
      name="new-card"
      buttonText="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="form__content">
        <label className="form__field">
          <input
            className="form__input form__input_type_place-name"
            name="place-name"
            ref={nameRef}
            id="place-name-input"
            type="text"
            placeholder="Название"
            minLength="2"
            maxLength="30"
            required
          />
          <span className="form__input-error place-name-input-error"></span>
        </label>
        <label className="form__field">
          <input
            className="form__input form__input_type_url"
            name="url"
            ref={linkRef}
            id="url-input"
            type="url"
            placeholder="Ссылка на картинку"
            required
          />
          <span className="form__input-error url-input-error"></span>
        </label>
      </fieldset>
    </PopupWithForm>
  );
};

export default AddCardPopup;