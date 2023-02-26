import PopupWithForm from "../PopupWithForm/PopupWithForm.jsx";
import { useContext, useState, useEffect } from "react";
import { CurrentUserContext, defaultUser } from "../../contexts/CurrentUserContext.js";

function EditProfilePopup({ onUpdateUser, transitionIsOpen, transitionOnClose, isLoading }) {

	const currentUser = useContext(CurrentUserContext);
	const [name, setName] = useState(defaultUser.name);
	const [description, setDescription] = useState(defaultUser.about);

	useEffect(() => {
		setName(currentUser.name);
		setDescription(currentUser.about);
		// console.log("USEEFFECT")
	}, [currentUser, transitionIsOpen])

	function handleChangeName(evt) {
		setName(evt.target.value)
		// console.log("name change")
	}

	function handleChangeDescription(evt) {
		setDescription(evt.target.value)
		// console.log("description change")
	}
	function handleSubmit(evt) {
		evt.preventDefault();

		// Передаём значения управляемых компонентов во внешний обработчик
		onUpdateUser({
			name,
			about: description,
		});
	}


	return (
		<PopupWithForm name="profile"
			title="Редактировать профиль"
			buttonText={isLoading ? "Сохранение" : "Сохранить"}
			isOpen={transitionIsOpen}
			onClose={transitionOnClose}
			onSubmit={handleSubmit}
		>
			<div className="popup__wrapper-input">
				<input required className="popup__input" id="input-name" name="userName" type="text"
					value={name} onChange={handleChangeName}
					minLength="2" maxLength="40" placeholder="Имя" />
				<span className="popup__input-error" id="input-name-error"></span>
			</div>
			<div className="popup__wrapper-input">
				<input required className="popup__input" id="input-about-him" name="userInfo" type="text"
					value={description} onChange={handleChangeDescription}
					minLength="2" maxLength="200" placeholder="Занятие" />
				<span className="popup__input-error" id="input-about-him-error"></span>
			</div>
		</PopupWithForm>
	)
}

export default EditProfilePopup;