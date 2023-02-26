import logoButtonAddCard from "../../images/profile/addCard.svg";
import logoButtonEditProfile from "../../images/profile/editProfile.svg";
import "./Main.css";
import Card from "../Card/Card.jsx"
import {useContext} from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";

function Main({cards, onEditAvatar, onEditProfile, onAddPlace, transitionOnCardClick, transitionHandleCardLike, transitionHandleDeleteClick}) {

	const currentUserInfo = useContext(CurrentUserContext);
	

	return (
		<main className="main">
			<section className="profile">
				<div className="profile__wrapper-avatar">
					<img className="profile__avatar" src={currentUserInfo.avatar} alt="Фото Жака-Ив Кусто" />
					<button className="profile__button-edit-avatar" onClick={onEditAvatar} type="button"></button>
				</div>
				<div className="profile__info">
					<div className="profile__wrapper-name">
						<h1 className="profile__name">{currentUserInfo.name}</h1>
						<button className="profile__button-edit" onClick={onEditProfile} type="button">
							<img className="profile__logo-edit" src={logoButtonEditProfile} alt="Изображение ручки" />
						</button>
					</div>
					<p className="profile__about-him">{currentUserInfo.about}</p>
				</div>
				<button className="profile__button-add" onClick={onAddPlace} type="button">
					<img className="profile__logo-add" src={logoButtonAddCard} alt="Символ сложения" />
				</button>
			</section>
			<section className="elements">
				{cards.map((element) => {
					return (
					<Card
						card={element}
						key={element._id}
						onCardClick={transitionOnCardClick}
						onCardLike={transitionHandleCardLike}
						onCardDelete={transitionHandleDeleteClick}
					/>
					)
				})}
			</section>
		</main>
	)
}

export default Main;
