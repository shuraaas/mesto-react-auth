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

    onRegister(email, password)
      .catch(err => {
        console.log(err);
        setState({
          ...state,
          message: 'Что-то пошло не так!'
        })
      });
  };

  return (
    <div className="login">
      <h2 className="login__description">Регистрация</h2>
      <form onSubmit={handleSubmit} className="form login__form">

        <fieldset className="form__content">
          <label className="form__field">
            <input
              // id="username"
              className="form__input form__input_type_login"
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
      <p className="login__nav">Уже зарегистрированы?</p>
      <Link to="/sign-in" className="login__link">Войти</Link>
    </div>
  );
};

export default Register;