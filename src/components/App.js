import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import Login from './Login';
import Register from './Register';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddCardPopup from './AddCardPopup';
import InfoTooltip from './InfoTooltip';
import ImagePopup from './ImagePopup';
import ProtectedRoute from './ProtectedRoute';
import api from '../utils/api';
import * as auth from '../utils/auth';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const App = () => {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [userEmail, setUserEmail] = useState('');
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);

  const history = useHistory();
  // Промисы
  const promiseUserInfo = api.getUserInfo();
  const promiseInitialCards = api.getInitialCards();

  useEffect(() => {
    Promise.all([promiseUserInfo, promiseInitialCards])
      .then(([userData, cards]) => {
        setCurrentUser(userData);
        setCards(cards);
      })
      .catch(err => console.error(err));

    tokenCheck();
  }, []);

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleCardClick = (name, link) => {
    setSelectedCard({ name, link });
  };

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
    setSelectedCard(null);
  };

  const handleUpdateUser = (data) => {
    api.setUserInfo(data)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch(err => console.error(err));
  };

  const handleUpdateAvatar = (avatar) => {
    api.changeAvatar(avatar)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch(err => console.error(err));
  };

  const handleAddCardSubmit = (data) => {
    api.setNewCard(data)
    .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.error(err));
  };

  const handleCardLike = ({ _id, likes }) => {
    const isLiked = likes.some(item => item._id === currentUser._id);

    api.likeCard(_id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === _id ? newCard : c));
      })
      .catch(err => console.error(err));
  };

  const handleCardDelete = (cardId) => {
    api.deleteCard(cardId)
      .then(() => {
        setCards((state) => state.filter(item => item._id !== cardId));
      })
      .catch(err => console.error(err));
  };

  const handleRegister = (email, password) => {
    return auth.register(email, password).then(() => {
      history.push('/sign-in');
    });
  };

  const handleLogin = (email, password) => {
    return auth.authorize(email, password)
      .then((data) => {
        if (!data.token) throw new Error('Missing token');

        localStorage.setItem('token', data.token);
        setLoggedIn(true);
        setUserEmail(email);
        history.push('/cards');
      });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
    history.push('/sign-in');
  }

  const tokenCheck = () => {
    const jwt = localStorage.getItem('token');

    if (!jwt) return;

    auth.getContent(jwt).then((data) => {
      setLoggedIn(true);
      setUserEmail(data.data.email);
      history.push("/cards");
    });
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
          <Header
            loggedIn={loggedIn}
            userEmail={userEmail}
            onLogout={handleLogout}
          />
          <Switch>
            <ProtectedRoute path="/cards" loggedIn={loggedIn}>
              <Main
                  onEditAvatar={handleEditAvatarClick}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  cards={cards}
                />
                <Footer />
            </ProtectedRoute>
            <Route path="/sign-up">
              <Register onRegister={handleRegister} />
            </Route>
            <Route path="/sign-in">
              <Login onLogin={handleLogin} />
            </Route>
            <Route>
              {loggedIn ? <Redirect to="/cards" /> : <Redirect to="/sign-in" />}
            </Route>
          </Switch>
        </div>

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <AddCardPopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddCard={handleAddCardSubmit}
        />
        {/* <PopupWithForm
          title="Вы уверены?"
          name="delete-card"
          buttonText="Да"
          isOpen=""
          onClose={closeAllPopups}
        /> */}
        <InfoTooltip
          isOpen={isInfoTooltipPopupOpen}
          name="info-tooltip"
          title="Вы успешно зарегистрировались!"
          onClose={closeAllPopups}
        />

      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;
