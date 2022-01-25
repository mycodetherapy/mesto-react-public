import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api.js";
import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupRegisterTooltip from "./PopupRegisterTooltip";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeleteCardPopup from "./DeleteCardPopup";
import { Route, Switch, Redirect } from "react-router-dom";
import { useHistory } from "react-router";
import Register from "./Register";
import Login from "./Login";
import * as Auth from "./Auth";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isPopupRegisterTooltip, setIsPopupRegisterTooltip] =
    React.useState(false);
  const [tooltipStatus, setTooltipStatus] = React.useState("");
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
  const [viewEmail, setViewEmail] = React.useState("");

  // const token = localStorage.getItem("token");

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    // console.log(token);
    token &&
      Auth.getContent(token).then((registerData) => {
        tokenCheck(registerData);
      });
  }, []);

  React.useEffect(() => {
    if(isLoggedIn) {
      Promise.all([
        // token && Auth.getContent(token),
        api.getUserInfo(),
        api.getCards(),
      ])
        .then(([userData, cardsData]) => {
          setCurrentUser(userData);
          setCards(cardsData);
          // tokenCheck(registerData);
        })
        .catch((err) => {
          console.log(err);
        });
    }
   
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  const handleLoggin = () => {
    setIsLoggedIn(true);
  };

  const HandleRegisterEmail = (email) => {
    setViewEmail(email);
  };

  function tokenCheck(res) {
    if (res) {
      setViewEmail(res.data.email);
      handleLoggin();
      history.push("/");
    }
  }

  // function tokenCheck() {
  //   if (localStorage.getItem("token")) {
  //     const token = localStorage.getItem("token");
  //     console.log(token);
  //     Auth.getContent(token).then((res) => {
  //       if (res) {
  //         console.log(res);
  //         setViewEmail(res.data.email);
  //         handleLoggin();
  //         history.push("/");
  //       }
  //     });
  //   }
  // }

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

  const handleRegisterAction = () => {
    setIsPopupRegisterTooltip(true);
  };

  const handleTooltipStatus = () => {
    setTooltipStatus("success");
  };

  const closeAllPopups = () => {
    setIsPopupRegisterTooltip(false);
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
          <Header email={viewEmail} />

          <Switch>
            <Route path="/sign-up">
              <Register
                onRegister={handleRegisterAction}
                onStatus={handleTooltipStatus}
              />
            </Route>

            <Route path="/sign-in">
              <Login
                onLoggin={handleLoggin}
                registerEmail={HandleRegisterEmail}
              />
            </Route>

            <ProtectedRoute
              path="/"
              loggedIn={isLoggedIn}
              component={Main}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleDeleteCardClick}
            />

            <Route>
              {!isLoggedIn ? (
                <Redirect to="/"></Redirect>
              ) : (
                <Redirect to="/sign-in"></Redirect>
              )}
            </Route>
          </Switch>

          {isLoggedIn && <Footer />}

          <PopupRegisterTooltip
            isOpen={isPopupRegisterTooltip}
            onClose={closeAllPopups}
            status={tooltipStatus}
          />

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
