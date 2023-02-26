import { useState } from 'react';

export default function Login({ onLogin, isLoading }) {
   const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	
	function handeSubmit(evt) {
		evt.preventDefault();
		onLogin(email, password)
	}

	function handleChangeEmail(evt) {
		setEmail(evt.target.value);
	}

	function handleChangePassword(evt) {
		setPassword(evt.target.value);
	}

	return (
		<section className="info-tooltip">
			<form className="info-tooltip__form" onSubmit={handeSubmit}>
				<p className="info-tooltip__title">Вход</p>
				<div className="info-tooltip__wrapper-inputs">
					<input required className="info-tooltip__input" name="email" type="email" placeholder="Email" 
					value={email} onChange={handleChangeEmail} />
					<span className="info-tooltip__input-error" id="input-email-error"></span>
					<input required className="info-tooltip__input" name="password" type="password" placeholder="Пароль" 
					value={password} onChange={handleChangePassword}
						minLength="8" />
					<span className="info-tooltip__input-error" id="input-password-error"></span>
				</div>
				<button className="info-tooltip__button-submit" type="submit">{ isLoading ? "Выполняется вход" : "Войти"}</button>
			</form>
		</section>
	)
}