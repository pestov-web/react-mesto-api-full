//подключаем реакт
import React from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";

// импортируем апи
import api from "../utils/Api";
import auth from "../utils/AuthApi";

// импортируем компоненты
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import InfoTooltip from "./InfoTooltip";

import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";

// подключаем контекст
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import login from "./Login";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);

  const [isRegisterSucces, setIsRegisterSucces] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState({
    name: "",
    link: "",
  });

  const history = useHistory();

  const [loggedIn, setLoggedIn] = React.useState(false);

  const [currentUser, setCurrentUser] = React.useState({});
  const [currentUserEmail, setCurrentUserEmail] = React.useState("");

  const [cards, setCards] = React.useState([]);

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleInfoTooltip = () => {
    setIsInfoTooltipOpen(true);
  };
  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  };

  // закрытие всех попапов
  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsInfoTooltipOpen(false);
  };

  // обновляем данные пользователя
  const handleUpdateUser = (userInfo) => {
    api
      .patchUserInfo(userInfo)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`не могу поменять данные пользователя: ${err}.`);
      });
  };

  // обновляем аватар
  const handleUpdateAvatar = (userAvatar) => {
    api
      .patchUserAvatar(userAvatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`не могу поменять данные пользователя: ${err}.`);
      });
  };

  // лайкаем карточку
  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(`ошибка: ${err}`);
      });
  }

  // удаляем карточку
  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(`ошибка: ${err}`);
      });
  }

  // добавляем новую карточку
  function handleAddPlaceSubmit(newCard) {
    api
      .postNewCard(newCard)
      .then((res) => {
        console.log(res);
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`ошибка: ${err}`);
      });
  }

  // закрываем попапы по нажатию ESC
  React.useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === "Escape") {
        closeAllPopups();
      }
    };

    document.addEventListener("keydown", closeByEscape);

    return () => document.removeEventListener("keydown", closeByEscape);
  }, []);

  // закрываем попапы по клику на оверлей
  function handleOverlayClick(evt) {
    if (evt.target === evt.currentTarget) {
      closeAllPopups();
    }
  }

  // авторизируем пользователя
  function handleLogin(password, email) {
    if (password && email) {
      auth
        .authorize(password, email)
        .then((res) => {
          setCurrentUser(res);
          setCurrentUserEmail(email);
          setLoggedIn(true);
          history.push("/");
        })
        .catch((err) => {
          console.log(`ошибка: ${err}`);
        });
    }
  }
  // регистрируем пользователя
  function handleRegister(password, email) {
    if (password && email) {
      auth
        .register(password, email)
        .then((res) => {
          if (res) {
            setIsRegisterSucces(true);

            history.push("/sign-in");
          }
        })
        .catch((err) => {
          setIsRegisterSucces(false);
          handleInfoTooltip();
          console.log(`ошибка: ${err}`);
        })
        .finally(() => {
          handleInfoTooltip();
        });
    }
  }

  React.useEffect(() => {
    auth.checkToken().then(
      (res) => {
        setCurrentUserEmail(res.email);
        setLoggedIn(true);
        history.push("/");
      },
      (err) => {
        console.log(err);
      }
    );
  }, [history]);

  // удаляем токен на выходе
  function handleSingOut() {
    auth.logOut().then(
        () => {
          setLoggedIn(false);
          history.push("/sign-in");
        },
        (err) => {
          console.log(err);
        }
    );
  }

  React.useEffect(() => {
    // получем данные польователоя с сервера
    api
      .getUserInfo()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => {
        console.log(`ошибка: ${err}`);
      });

    api
      .getInitialCards()
      .then((cards) => {
        setCards(cards);
      })
      .catch((err) => {
        console.log(`ошибка: ${err}`);
      });
  }, []);

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header
          loggedIn={loggedIn}
          userEmail={currentUserEmail}
          onSingOut={handleSingOut}
        />
        <Switch>
          <ProtectedRoute
            exact
            path="/"
            component={Main}
            loggedIn={loggedIn}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
          <Route path="/sign-in">
            <Login onLogin={handleLogin} />
          </Route>
          <Route path="/sign-up">
            <Register onRegister={handleRegister} />
          </Route>
          <Route>
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
          </Route>
        </Switch>
        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          onOverlayClick={handleOverlayClick}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          onOverlayClick={handleOverlayClick}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          onOverlayClick={handleOverlayClick}
        />

        <PopupWithForm name="confirm" title="Вы уверены?" buttonText="Да" />

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
          isOpen={isImagePopupOpen}
          onOverlayClick={handleOverlayClick}
        />
        <InfoTooltip
          onClose={closeAllPopups}
          isOpen={isInfoTooltipOpen}
          isRegisterSucces={isRegisterSucces}
          onOverlayClick={handleOverlayClick}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
