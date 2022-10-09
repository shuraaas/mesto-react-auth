import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

function NavBar ({ loggedIn, userEmail, onLogout }) {
  const routeMatch = useRouteMatch('/sign-in');

  return (
    <div className="navbar">
      <ul className="navbar__nav">
        {(routeMatch && !loggedIn) && <Link className="navbar__link" to="/sign-up">Регистрация</Link>}
        {(!routeMatch && !loggedIn) && <Link className="navbar__link" to="/sign-in">Войти</Link>}
        {loggedIn && <li>{userEmail}</li>}
        {loggedIn && <li><button onClick={onLogout} className="btn navbar__link">Выйти</button></li>}
      </ul>
    </div>
  )
}

export default NavBar;