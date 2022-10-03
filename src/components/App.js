import React, { useState, useEffect } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddCardPopup from './AddCardPopup';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const App = () => {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const promiseUserInfo = api.getUserInfo();
  const promiseInitialCards = api.getInitialCards();

  useEffect(() => {
    Promise.all([promiseUserInfo, promiseInitialCards])
      .then(([userData, cards]) => {
        setCurrentUser(userData);
        setCards(cards);
      })
      .catch(err => console.error(err));
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

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
          <Header />
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
        <PopupWithForm
          title="Вы уверены?"
          name="delete-card"
          buttonText="Да"
          isOpen=""
          onClose={closeAllPopups}
        />

      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;
