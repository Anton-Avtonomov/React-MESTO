import logoMesto from "../../images/header/logoMesto.svg";
import { Switch, Route, Link } from "react-router-dom";
import "./Header.css";

function Header({ loginName, loginOut }) {

	return (
		<header className="header">
			<img className="header__logo" src={logoMesto} alt="Изображение логотипа Mesto-Russia" />
			<div className="header__heading">
				<p className="header__email">{loginName}</p>
				<Switch>
					
					<Route path='/sign-up'>
						<Link to='/sign-in' className="header__link">Войти</Link>
					</Route>
					<Route path='/sign-in'>
						<Link to='/sign-up' className="header__link">Регистрация</Link>
					</Route>
					<Route exact path='/'>
						<button className="header__link" type="button" onClick={loginOut}>Выйти</button>
					</Route>

				</Switch>
			</div>
		</header>
	)
}

export default Header;