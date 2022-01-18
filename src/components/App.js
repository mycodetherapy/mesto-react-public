import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api.js";
import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeleteCardPopup from "./DeleteCardPopup";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import { useHistory } from "react-router";
import Register from "./Register";
import Login from "./Login";
import * as Auth from "./Auth";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);

  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] =
    React.useState(false);
  const [currentCard, setCurrentCard] = React.useState({});

  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const history = useHistory();
  const [email, setEmail] = React.useState("");

  React.useEffect(() => {
    tokenCheck();
  }, []);

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getCards()])
      .then(([userData, cardsData]) => {
        setCurrentUser(userData);
        setCards(cardsData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleLoggin = () => {
    setLoggedIn(!loggedIn);
  };

  function tokenCheck() {
    // если у пользователя есть токен в localStorage,
    // эта функция проверит, действующий он или нет
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      if (token) {
        Auth.getContent(token).then((res) => {
          if (res) {
            console.log(res);
            setEmail(res.data.email);
            console.log(email);
            handleLoggin();
            history.push("/");
          } else {
            history.push("/sign-in");
          }
        });
      }
    }
  }

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    let methodFetchLike = isLiked ? "DELETE" : "PUT";
    api
      .toggleLike(methodFetchLike, card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCardDelete = () => {
    api
      .removeCard(currentCard._id)
      .then(() => {
        setCards((state) =>
          state.filter((c) => c._id !== currentCard._id && c)
        );
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdateUserInfo = (inputUserData, methodApi) => {
    api[methodApi](inputUserData)
      .then((outputUserData) => {
        setCurrentUser(outputUserData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmitAddPlace = (inputCard) => {
    api
      .addCard(inputCard)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleDeleteCardClick = (card) => {
    setCurrentCard(card);
    setIsDeleteCardPopupOpen(true);
  };

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setSelectedCard({});
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="common">
        <div className="page">
          <Header email={email} />
          <Switch>
            <Route path="/sign-up">
              <Register />
            </Route>
            <Route path="/sign-in">
              <Login handleLoggin={handleLoggin} />
            </Route>

            <ProtectedRoute
              path="/"
              loggedIn={loggedIn}
              component={Main}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleDeleteCardClick}
            />
            {/* <Route exact path="/">
              <Main
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                cards={cards}
                onCardLike={handleCardLike}
                onCardDelete={handleDeleteCardClick}
              />
            </Route> */}

            <Route>
              {!loggedIn ? (
                <Redirect to="/"></Redirect>
              ) : (
                <Redirect to="/sign-in"></Redirect>
              )}
            </Route>
          </Switch>

          <Footer />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUserInfo}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleSubmitAddPlace}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateUserInfo}
          />

          <DeleteCardPopup
            isOpen={isDeleteCardPopupOpen}
            onClose={closeAllPopups}
            onDeleteCard={handleCardDelete}
          />

          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
