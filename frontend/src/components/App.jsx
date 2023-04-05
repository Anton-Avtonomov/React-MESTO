import "../index.css";
import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Login from "./Login/Login.jsx";
import Register from "./Register/Register.jsx";
import Footer from "./Footer/Footer.jsx";
import EditProfilePopup from "./EditProfilePopup/EditProfilePopup.jsx";
import AddPlacePopup from "./AddPlacePopup/AddPlacePopup.jsx";
import ImagePopup from "./ImagePopup/ImagePopup.jsx";
import EditAvatarPopup from "./EditAvatarPopup/EditAvatarPopup.jsx";
import InfoTooltipPopup from "./InfoTooltipPopup/InfoTooltipPopup.jsx";
import ConfirmDeletionPopup from "./ConfirmDeletionPopup/ConfirmDeletionPopup.jsx";
import Api from "../utils/Api.js";
import Auth from "../utils/Auth.js";
import { useState, useEffect, useRef } from "react";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import {
  CurrentUserContext,
  defaultUser,
} from "../contexts/CurrentUserContext.js";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute.jsx";

function App() {
  useEffect(() => {
    document.body.classList.add("body");
  }, []);

  // Hooks
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);

  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

  const [isConfirmDeletePopupOpen, setisConfirmDeletePopupOpen] =
    useState(false);

  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState(null);

  const [userEmailOnHeader, setUserEmailOnHeader] = useState("");

  const [statusAuth, setStatusAuth] = useState(true);

  const isOpen =
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    isEditAvatarPopupOpen ||
    isConfirmDeletePopupOpen ||
    Boolean(selectedCard) ||
    isInfoTooltipPopupOpen;

  const [currentUser, setCurrentUser] = useState(defaultUser);

  const [cards, setCards] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const cardRef = useRef();

  const history = useHistory();

  function checkToken() {
    const token = localStorage.getItem("tokenUser");
    if (token) {
      Auth.validityToken()
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  useEffect(() => {
    // console.log(
    //   "сработал Useeffect проверки состояния авторизации",
    //   isLoggedIn
    // );
    const token = localStorage.getItem("tokenUser");
    if (!token) {
      return;
    } else if (token) {
      checkToken(); // Проверка токена
    } else {
      console.log("Пользователь НЕ авторизован!");
      return;
    }
    if (isLoggedIn) {
      async function fetchUserData() {
        try {
          const userInfo = await Api.getUserData();
          // console.log(`userInfo: ${JSON.stringify(userInfo)}`); Провера вариант 1
          // console.log(`userInfo._id: ${userInfo._id}`); Провера вариант 2
          setCurrentUser(userInfo);
          setUserEmailOnHeader(userInfo.email);
        } catch {
          console.log("ошибка в запросе данных ТЕКУЩЕГо пользователя");
        }
      }

      async function fetchArrayCards() {
        try {
          const arrayCards = await Api.getCardsList();
          setCards(arrayCards);
        } catch {
          console.log("ошибка в запросе массива карточек");
        }
      }
      fetchArrayCards();
      fetchUserData();
      history.push("/");
    }
  }, [history, isLoggedIn]);

  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }
    function closeByOverlay(evt) {
      if (evt.target.classList.contains("popup__container")) {
        closeAllPopups();
      }
    }
    if (isOpen) {
      // навешиваем только при открытии
      document.addEventListener("keydown", closeByEscape);
      document.addEventListener("click", closeByOverlay);
      return () => {
        document.removeEventListener("keydown", closeByEscape);
        document.removeEventListener("keydown", closeByOverlay);
      };
    }
  }, [isOpen]);

  // set Hooks
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleConfirmDeleteClick(card) {
    cardRef.current = card;
    setisConfirmDeletePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setisConfirmDeletePopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
    setSelectedCard(null);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleUpdateUser(userInfo) {
    setIsLoading(true);
    Api.setUserInfoServer(userInfo)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateAvatar(linkAvatar) {
    setIsLoading(true);
    Api.setUserAvatarServer(linkAvatar)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleDeleteCard() {
    setIsLoading(true);
    Api.deleteCard(cardRef.current._id)
      .then(() => {
        // возвращаю массив из всех объектов кроме удаленного(card._id)
        // setCards(cards.filter(i => i._id !== cardRef.current._id))
        setCards((state) =>
          state.filter((item) => item._id !== cardRef.current._id)
        );
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleCardLike(card) {
    // проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((item) => item === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    Api.changeLikeStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((item) => (item._id === card._id ? newCard : item))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(newCard) {
    setIsLoading(true);
    Api.pushNewcard(newCard)
      .then((newCard) => {
        // возвращаю массив карточек с вновь добавленной
        // console.log(newCard);
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function onLogin(email, password) {
    setIsLoading(false);
    Auth.authorization(email, password)
      .then((res) => {
        if (res) {
          //Меняю состояние на авторизованное
          setIsLoggedIn(true);
          // Изменяем email в блоке HEADER
          setUserEmailOnHeader(email);
          // Сохраняем данные юзера
          localStorage.setItem("tokenUser", res.tokenUser);
          // Переходим на главную страницу
          history.push("/");
        }
      })
      .catch(() => {
        setStatusAuth(false);
        setIsInfoTooltipPopupOpen(true);
        //! статус загрузки
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function onRegister(email, password) {
    setIsLoading(false);
    Auth.register(email, password)
      // статус загрузки
      .then((res) => {
        if (res) {
          //Меняю значения на COMPLETE в infoTooltipPopup
          setStatusAuth(true);
          //Открываю infoTooltipPopup
          setIsInfoTooltipPopupOpen(true);
          //Перехожу на страницу авторизации
          history.push("/sign-in");
        }
      })
      .catch(() => {
        //меняю значения на FAIL в infoTooltipPopup
        setStatusAuth(false);
        //Открываю infoTooltipPopup
        setIsInfoTooltipPopupOpen(true);
        // статус загрузки
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function loginOut() {
    localStorage.removeItem("tokenUser");
    history.push("/sign-in");
    setIsLoggedIn(false);
    setUserEmailOnHeader("");
  }

  return (
    <div className="root" id="root">
      <Header loginName={userEmailOnHeader} loginOut={loginOut} />

      <CurrentUserContext.Provider value={currentUser}>
        <Switch>
          <ProtectedRoute
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            transitionOnCardClick={handleCardClick}
            cards={cards}
            transitionHandleCardLike={handleCardLike}
            transitionHandleDeleteClick={handleConfirmDeleteClick}
            loggedIn={isLoggedIn}
            component={Main}
            exact
            path="/"
          />

          <Route path="/sign-in">
            <Login onLogin={onLogin} isLoading={isLoading} />
          </Route>

          <Route path="/sign-up">
            <Register onRegister={onRegister} isLoading={isLoading} />
          </Route>

          <Route>
            {isLoggedIn ? <Redirect to="/" /> : <Redirect to="/sign-up" />}
          </Route>
        </Switch>
        <AddPlacePopup
          transitionIsOpen={isAddPlacePopupOpen}
          transitionOnClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isLoading}
        />

        <EditProfilePopup
          transitionIsOpen={isEditProfilePopupOpen}
          transitionOnClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />

        <EditAvatarPopup
          transitionIsOpen={isEditAvatarPopupOpen}
          transitionOnClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />

        <ImagePopup
          card={selectedCard}
          isOpen={selectedCard}
          onClose={closeAllPopups}
        />

        <ConfirmDeletionPopup
          card={selectedCard}
          isOpen={selectedCard}
          transitionIsOpen={isConfirmDeletePopupOpen}
          transitionOnClose={closeAllPopups}
          onDeleteCard={handleDeleteCard}
          isLoading={isLoading}
        />

        <InfoTooltipPopup
          statusAuth={statusAuth}
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeAllPopups}
        />
      </CurrentUserContext.Provider>

      {isLoggedIn && <Footer />}
    </div>
  );
}

export default App;
