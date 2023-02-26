function PopupWithForm({name, isOpen, title, buttonText, onSubmit, onClose, children}) {
	return (
		<section className={`popup popup_type_${name} ${isOpen && "popup_opened"}`}>
			<div className="popup__container">
				<div className={`popup__content ${isOpen && "popup__content_opened"}`}>
					<form name={name} className="popup__form" onSubmit={onSubmit}>
						<h2 className="popup__heading">{title}</h2>
						
						{children}

						<button type="submit" className="popup__button-submit">{buttonText}</button>
					</form>
					<button className="popup__button-close" onClick={onClose} type="button"></button>
				</div>
			</div>
		</section>
	)
}

export default PopupWithForm;