import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  const [state, setState] = useState({
    username: '',
    password: ''
  })

  const handleChangeUserName = () => {

  };

  const handleChangePassword = () => {

  }

  return (
    <div className="login">
      <h2 className="login__description">Регистрация</h2>
      <form className="form login__form">

        <fieldset className="form__content">
          <label className="form__field">
            <input
              // id="username"
              className="form__input form__input_type_login"
              name="username"
              type="text"
              value={state.username}
              onChange={handleChangeUserName}
              placeholder="Email"
              required
            />
            {/* <span className="form__input-error name-input-error"></span> */}
          </label>
          <label className="form__field">
            <input
              // id="password"
              className="form__input form__input_type_login"
              name="password"
              type="password"
              value={state.password}
              onChange={handleChangePassword}
              placeholder="Пароль"
              required
            />
            {/* <span className="form__input-error job-input-error"></span> */}
          </label>
        </fieldset>

        <button type="submit" className="btn btn_type_save btn_type_login">Зарегистрироваться</button>
      </form>
      <p className="login__nav">Уже зарегистрированы? <Link className="login__link" to="/login">Войти</Link></p>
      <Link ></Link>
    </div>
  );
};

export default Register;