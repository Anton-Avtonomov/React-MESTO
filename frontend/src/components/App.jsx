import "../index.css";
import Header from "./Header/Header.jsx"
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
import { CurrentUserContext, defaultUser } from "../contexts/CurrentUserContext.js";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute.jsx";



function App() {

	useEffect(
		() => {
			document.body.classList.add("body");
		}, [])

	// Hooks
	const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);

	const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);

	const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

	const [isConfirmDeletePopupOpen, setisConfirmDeletePopupOpen] = useState(false);

	const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);

	const [selectedCard, setSelectedCard] = useState(null);

	const [userEmailOnHeader, setUserEmailOnHeader] = useState("");

	const [statusAuth, setStatusAuth] = useState(true);

	const isOpen = isEditProfilePopupOpen || isAddPlacePopupOpen || isEditAvatarPopupOpen || isConfirmDeletePopupOpen || Boolean(selectedCard) || isInfoTooltipPopupOpen;

	const [currentUser, setCurrentUser] = useState(defaultUser);

	const [cards, setCards] = useState([]);

	const [isLoading, setIsLoading] = useState(false);

	const [loggedIn, setLoggedIn] = useState(false);

	const cardRef = useRef();

	const history = useHistory();

	useEffect(

		() => {

			if (loggedIn) {

				async function fetchUserData() {
					try {
						const userInfo = await Api.getUserData();
						setCurrentUser(userInfo);
						// console.log(userInfo);
						// setCurrentUser(await Api._getUserData());
					}
					catch {
						console.log("???????????? ?? ?????????????? ???????????? ???????????????? ????????????????????????")
					}
				}
				fetchUserData();

				async function fetchArrayCards() {
					try {
						const arrayCards = await Api.getCardsList();
						setCards(arrayCards);
					}
					catch {
						console.log("???????????? ?? ?????????????? ?????????????? ????????????????")
					}
				}

				if (loggedIn) {

				}
				fetchArrayCards();
			}

		}, [loggedIn])

	useEffect(() => {

		function closeByEscape(evt) {
			if (evt.key === "Escape") {
				closeAllPopups();
			}
		}
		if (isOpen) { // ???????????????????? ???????????? ?????? ????????????????
			document.addEventListener("keydown", closeByEscape);
			return () => {
				document.removeEventListener("keydown", closeByEscape);
			}
		}

	}, [isOpen])

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
		Api
			.setUserInfoServer(userInfo)
			.then((data) => {
				setCurrentUser(data);
				closeAllPopups();
			})
			.catch((err) => {
				console.log(err)
			})
			.finally(() => {
				setIsLoading(false);
			})
	}

	function handleUpdateAvatar(linkAvatar) {
		setIsLoading(true);
		Api
			.setUserAvatarServer(linkAvatar)
			.then((data) => {
				setCurrentUser(data);
				closeAllPopups();
			})
			.catch((err) => {
				console.log(err);
			})
			.finally(() => {
				setIsLoading(false);
			})
	}

	function handleDeleteCard() {
		setIsLoading(true);
		Api.deleteCard(cardRef.current._id)
			.then(() => {
				// ?????????????????? ???????????? ???? ???????? ???????????????? ?????????? ????????????????????(card._id)
				// setCards(cards.filter(i => i._id !== cardRef.current._id))
				setCards((state) => state.filter((item) => item._id !== cardRef.current._id));
				closeAllPopups();
			})
			.catch((err) => {
				console.log(err)
			})
			.finally(() => {
				setIsLoading(false);
			})
	}

	function handleCardLike(card) {
		// ??????????????????, ???????? ???? ?????? ???????? ???? ???????? ????????????????
		const isLiked = card.likes.some(i => i._id === currentUser._id);
		// ???????????????????? ???????????? ?? API ?? ???????????????? ?????????????????????? ???????????? ????????????????
		Api
			.changeLikeStatus(card._id, isLiked)
			.then((newCard) => {
				setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
			})
			.catch((err) => {
				console.log(err);
			});
	}

	function handleAddPlaceSubmit(newCard) {
		setIsLoading(true)
		Api.pushNewcard(newCard)
			.then((newCard) => {
				// ?????????????????? ???????????? ???????????????? ?? ?????????? ??????????????????????
				setCards([newCard, ...cards])
				closeAllPopups();
			})
			.catch((err) => {
				console.log(err)
			})
			.finally(() => {
				setIsLoading(false);
			})
	}

	function onLogin(email, password) {
		setIsLoading(false);
		Auth.authorization(email, password)
			.then((res) => {
				if (res) {
					//?????????? ?????????????????? ???? ????????????????????????????
					setLoggedIn(true);
					// ???????????????? email ?? ?????????? HEADER
					setUserEmailOnHeader(email);
					// ?????????????????? ???? ?????????????? ????????????????
					history.push("/")
					// ?????????????????? ???????????? ??????????
					localStorage.setItem("jwt", res.token)
				}
			})
			.catch(() => {
				setStatusAuth(false);
				setIsInfoTooltipPopupOpen(true);
				//! ???????????? ????????????????
			})
			.finally(() => {
				setIsLoading(false)
			});
	}

	function onRegister(email, password) {
		setIsLoading(false);
		Auth.register(email, password)
			// ???????????? ????????????????
			.then((res) => {
				if (res) {
					//?????????? ???????????????? ???? COMPLETE ?? infoTooltipPopup
					setStatusAuth(true);
					//???????????????? infoTooltipPopup
					setIsInfoTooltipPopupOpen(true);
					//???????????????? ???? ???????????????? ??????????????????????
					history.push('/sign-in');
				}
			})
			.catch(() => {
				//?????????? ???????????????? ???? FAIL ?? infoTooltipPopup
				setStatusAuth(false);
				//???????????????? infoTooltipPopup
				setIsInfoTooltipPopupOpen(true);
				// ???????????? ????????????????
			})
			.finally(() => {
				setIsLoading(false)
			});
	}

	function checkToken() {
		const token = localStorage.getItem('jwt');
		if (token) {
			Auth.validityToken(token)
				.then((res) => {
					if (res) {
						setUserEmailOnHeader(res.data.email)
						setLoggedIn(true);
						history.push('/');
					};

				})
				.catch((err) => {
					console.log(err);
				});
		}
	}

	useEffect(() => {
		checkToken();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	function loginOut() {
		localStorage.removeItem('jwt');
		history.push('/sign-in');
		setLoggedIn(false);
		setUserEmailOnHeader("");
	}

	return (
		<div className="root" id="root">
			<Header
				loginName={userEmailOnHeader}
				loginOut={loginOut}
			/>

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
						loggedIn={loggedIn}
						component={Main}
						exact path="/"
					/>

					<Route path="/sign-in">
						<Login
							onLogin={onLogin}
							isLoading={isLoading}
						/>
					</Route>

					<Route path="/sign-up" >
						<Register
							onRegister={onRegister}
							isLoading={isLoading}
						/>
					</Route>

					<Route>
						{loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-up" />}
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

			{loggedIn && <Footer />}
		</div>
	);
}

export default App;