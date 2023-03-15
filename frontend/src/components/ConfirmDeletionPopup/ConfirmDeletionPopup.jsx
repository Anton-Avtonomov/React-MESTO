/* eslint-disable no-unused-vars */
import PopupWithForm from "../PopupWithForm/PopupWithForm.jsx";

function ConfirmDeletionPopup({ card, transitionOnClose, onDeleteCard, transitionIsOpen, isOpen, isLoading }) {

	const booleanIsOpen = Boolean(isOpen);

	function handleSubmit(evt) {
		evt.preventDefault();
		onDeleteCard(card);

	}

	return (
		<PopupWithForm
			name="confirm-deletion"
			title="Вы уверены?"
			buttonText={isLoading ? "Удаление" : "Да"}
			isOpen={transitionIsOpen}
			onClose={transitionOnClose}
			onSubmit={handleSubmit}
		/>
	)

}

export default ConfirmDeletionPopup;