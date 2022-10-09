import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = ({ onRegister }) => {
  const [state, setState] = useState({
    email: '',
    password: '',
    message: ''
  });

  const handleChangeUserEmail = (e) => {
    setState({
      ...state,
      email: e.target.value
    })
  };

  const handleChangePassword = (e) => {
    setState({
      ...state,
      password: e.target.value
    })
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = state;
    onRegister(email, password);
  };

  return (
    <section onSubmit={handleSubmit} className="auth">
      <h2 className="auth__description">Регистрация</h2>
      <form className="form register__form">
        <fieldset className="form__content form__content_type_auth">
          <label className="form__field">
            <input
              className="form__input form__input_type_auth"
              name="email"
              type="text"
              value={state.email}
              onChange={handleChangeUserEmail}
              placeholder="Email"
              required
            />
            {/* <span className="form__input-error name-input-error"></span> */}
          </label>
          <label className="form__field">
            <input
              className="form__input form__input_type_auth"
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
        <button type="submit" className="btn btn_type_save btn_type_auth">Зарегистрироваться</button>
      </form>

      <div className="auth__signin">
        <p className='auth__login'>Уже зарегистрированы?</p>
        <Link to="/sign-in" className="auth__login-link">Войти</Link>
      </div>

    </section>
  );
};

export default Register;