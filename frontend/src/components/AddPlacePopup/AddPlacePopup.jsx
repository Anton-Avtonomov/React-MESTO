import {useState, useEffect} from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm.jsx";

function AddPlacePopup ({ onAddPlace, transitionIsOpen, transitionOnClose, isLoading }) {

const [cardTitle, setCardTitle] = useState("");
const [cardLink, setCardLink] = useState("");

useEffect(() => {
	setCardTitle("");
	setCardLink("");
},[])

function handleSubmit(evt) {
evt.preventDefault();
onAddPlace({
	name: cardTitle,
	link: cardLink
});
}

function handleChangeTitle(evt) {
	setCardTitle(evt.target.value)
}

function handleChangeLink(event) {
	setCardLink(event.target.value)
}

return (
    <PopupWithForm name="place"
				title="Новое место"
				buttonText={isLoading ? "Создаю" : "Создать"}
				isOpen={transitionIsOpen}
				onClose={transitionOnClose}
				onSubmit={handleSubmit}
			>
				<div className="popup__wrapper-input">
					<input className="popup__input" id="input-title" name="name" type="text" placeholder="Название"
						required minLength="2" maxLength="30" value={cardTitle} onChange={handleChangeTitle}/>
					<span className="popup__input-error" id="input-title-error"></span>
				</div>
				<div className="popup__wrapper-input">
					<input className="popup__input" id="input-link" name="link" type="url"
						placeholder="Ссылка на картинку" required value={cardLink} onChange={handleChangeLink}/>
					<span className="popup__input-error" id="input-link-error"></span>
				</div>
			</PopupWithForm>
)
}

export default AddPlacePopup;