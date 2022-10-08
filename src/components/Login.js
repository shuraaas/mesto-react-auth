import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [state, setState] = useState({
    email: '',
    password: '',
    message: ''
  })

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

    if (!email || !password) return;

    onLogin(email, password)
      .catch(err => {
        console.log(err);
        setState({
          ...state,
          message: 'Что-то пошло не так!'
        })
      });
  };

  return (
    <section onSubmit={handleSubmit} className="auth">
      <h2 className="auth__description">Вход</h2>
      <form className="form login__form">
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
        <button type="submit" className="btn btn_type_save btn_type_auth">Войти</button>
      </form>
    </section>
  );
};

export default Login;