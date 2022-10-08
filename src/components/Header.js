import React from 'react';
import { Link } from 'react-router-dom';
import logoPath from '../images/header-logo.svg';

const Header = ({ loggedIn, userEmail, onLogout }) => {
  return (
    <header className="header">
      <img className="header__logo" src={logoPath} alt="Логотоп сайта место." />
      <p>{loggedIn && userEmail}</p>
      {loggedIn && <button onClick={onLogout}>Выйти</button>}
      {!loggedIn && <Link className="header__link" to="/sign-up">Регистрация</Link>}
    </header>
  );
};

export default Header;