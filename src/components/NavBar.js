import React from 'react';
import { Link } from 'react-router-dom';

function NavBar ({ loggedIn, userEmail, onLogout, type }) {
  return (
    <div className="navbar">
      <ul className="navbar__nav">
        {!loggedIn && type === 'login' ? <Link className="navbar__link" to="/sign-up">Регистрация</Link> : null}
        {!loggedIn && type === 'register' ? <Link className="navbar__link" to="/sign-in">Войти</Link> : null}
        {loggedIn && <li>{userEmail}</li>}
        {loggedIn && <li><button onClick={onLogout} className="btn navbar__link">Выйти</button></li>}
      </ul>
    </div>
  )
}

export default NavBar;