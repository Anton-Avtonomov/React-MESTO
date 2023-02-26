import {useRef} from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm.jsx";

function EditAvatarPopup({ onUpdateAvatar, transitionIsOpen, transitionOnClose, isLoading }) {

const userAvatar = useRef();

function handleSubmit(evt) {
evt.preventDefault();
onUpdateAvatar(userAvatar.current.value);
}

return(
    <PopupWithForm name="avatar"
				title="Обновить аватар"
				buttonText={isLoading ? "Обновление" : "Сохранить"}
				isOpen={transitionIsOpen}
				onClose={transitionOnClose}
				onSubmit={handleSubmit}
			>
				<div className="popup__wrapper-input">
					<input className="popup__input" name="linkAvatar" id="input-avatar" type="url"
						placeholder="Ссылка на картинку" ref={userAvatar} required />
					<span className="popup__input-error" id="input-avatar-error"></span>
				</div>
			</PopupWithForm>
)

}

export default EditAvatarPopup;