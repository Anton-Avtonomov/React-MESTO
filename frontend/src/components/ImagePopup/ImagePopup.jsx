function ImagePopup({isOpen, card, onClose}) {
	
	const booleanIsOpen = Boolean(isOpen);

	return (
		<section className={`popup ${booleanIsOpen && 'popup_opened popup_theme_dark'}`}>
			<div className="popup__container">
				<div className="popup__content_type_card-place">
					<img className="popup__image" src={booleanIsOpen ? card.link : "#"}
						alt={booleanIsOpen ? card.name : ""} />
					<h2 className="popup__image-title">{booleanIsOpen ? card.name : ""}</h2>
					<button className="popup__button-close" type="button" onClick={onClose}></button>
				</div>
			</div>
		</section>
	)
}

export default ImagePopup;