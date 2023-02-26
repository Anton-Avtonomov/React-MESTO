import "./InfoTooltipPopup.css";
import logoClosed from "../../images/popup/closed.svg";
import iconComplete from "../../images/popup/icon-complete.svg";
import iconFail from "../../images/popup/icon-fail.svg";


export default function InfoTooltip({ isOpen, onClose, statusAuth }) {

	return (
		<section name={statusAuth ? "Popup-Complete-Registration!" : "Popup-Fail-Registration"}
			className={`popup ${isOpen && 'popup_opened'}`}>
			<div className="popup__container">
				<div className="popup__content_type_info-tooltip">
					<div className="popup__form ">
						<img src={statusAuth ? iconComplete : iconFail} alt={statusAuth ? "Изображение галочки" : "Символ крестика"} className="popup__icon" />
						<h2 className="popup__heading popup__heading_type_info-tooltip" > {statusAuth ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."} </h2>
						<img src={logoClosed} alt="Изображение крестика" className="popup__button-close" onClick={onClose} />
					</div>
				</div>
			</div>
		</section>
	)
}

