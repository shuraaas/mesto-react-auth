import React, { useState } from 'react';

const Login = () => {
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
      <h2 className="login__description">Вход</h2>
      <form className="form login__form">

        <fieldset className="form__content">
          <label className="form__field">
            <input
              id="username"
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
              id="password"
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

        <button type="submit" className="btn btn_type_save btn_type_login">Войти</button>
      </form>
    </div>
  );
};

export default Login;