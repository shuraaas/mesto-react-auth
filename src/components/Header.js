import React from 'react';
import { Link } from 'react-router-dom';
import logoPath from '../images/header-logo.svg';

const Header = () => {
  return (
    <header className="header">
      <img className="header__logo" src={logoPath} alt="Логотоп сайта место." />
      <Link className="header__link" to="/sign-up">Регистрация</Link>
    </header>
  );
};

export default Header;