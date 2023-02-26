import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...props }) => {
	return (
		<Route >
			{
				//Условие выполнения ? компонент для отрисовки со всеми пропсами : Иначе переадресовать на страницу
			() => props.loggedIn ? < Component {...props} /> : <Redirect to="/sign-in" />
			}
		</Route>
	);
}

export default ProtectedRoute;