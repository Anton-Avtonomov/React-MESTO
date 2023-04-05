import "./Card.css";
import logoLike from "../../images/elements/logo-like.svg";
import logoDeleting from "../../images/elements/logo-delete.png";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js"

function Card({card, onCardClick, onCardLike, onCardDelete}) {
	const currentUser = useContext(CurrentUserContext);
	// button Delete

  const isOwn = card.owner === currentUser._id; // Сравниваем id карточки с ID текущего пользоватя
	const cardDeleteButtonClassName = (`element__button-delete ${isOwn ? "element__button-delete_visible" : "element__button-delete_hidden"}`);
	// button Like

	const isLiked = card.likes.some(i => i === currentUser._id);
	const cardLikeButtonClassName = (`"element__logo-like" ${isLiked && "element__logo-like_active"}`);

	// Click by card
	function handleClick() {
		onCardClick(card);
	}
// Click by button likes card
	function handleLikeClick() {
    onCardLike(card);
	}

	function handleDeleteCard() {
		onCardDelete(card);
	}

	return (
		<div className="element">
			<img className="element__image" src={card.link}
				alt={`Изображение ${card.name}`}
				onClick={handleClick} />
			<div className="element__heading">
				<h2 className="element__title">{card.name}</h2>
				<div className="element__like">
					<button className="element__button-like" type="button">
						<img className={cardLikeButtonClassName} src={logoLike}
							alt="Изображение кнопки лайка" onClick={handleLikeClick} />
					</button>
					<p className="element__likes-counter">{card.likes.length}</p>
				</div>
			</div>
			<button className={cardDeleteButtonClassName} onClick={handleDeleteCard}>
				<img className="element__logo-delete" src={logoDeleting}
					alt="Изображение мусорной корзины" />
			</button>
		</div>
	)
}

export default Card;