import React from 'react';
// import PopupWithForm from './PopupWithForm';

const InfoTooltip = ({ isOpen, name, title, onClose, onUpdateAvatar }) => {
  // const inputRef = useRef();

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   onUpdateAvatar({
  //     avatar: inputRef.current.value
  //   });
  //   inputRef.current.value = '';
  // };

  return (
    // <PopupWithForm
    //   title="Вы успешно зарегистрировались!"
    //   name="edit-avatar"
    //   buttonText="Сохранить"
    //   isOpen={isOpen}
    //   onClose={onClose}
    //   onSubmit={handleSubmit}
    // >
    //   <fieldset className="form__content">
    //     <label className="form__field">
    //       <input
    //         ref={inputRef}
    //         className="form__input form__input_type_avatar"
    //         name="avatar"
    //         id="avatar-input"
    //         type="url"
    //         placeholder="Ссылка на аватар"
    //         required
    //       />
    //       <span className="form__input-error avatar-input-error"></span>
    //     </label>
    //   </fieldset>
    //   <p>bla bla</p>
    // </PopupWithForm>

    <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container popup__container_type_info-tooltip">
        <button className="btn btn_type_close" type="button" onClick={onClose}></button>
        <div className="popup__register"></div>
        <h2 className="popup__description">{title}</h2>
        {/* {children} */}
      </div>
    </div>
  );
};

export default InfoTooltip;