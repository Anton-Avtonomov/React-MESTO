// sprint 11 #3
import React from "react";
import defaultUserAvatar from "../images/profile/avatar-jacques.jpg";

export const CurrentUserContext = React.createContext();
export const defaultUser = {
    name: "Жак Ив Кусто",
    about: "Исследователь океана",
    avatar: defaultUserAvatar
}