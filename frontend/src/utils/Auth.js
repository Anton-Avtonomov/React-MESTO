/* eslint-disable import/no-anonymous-default-export */
class Auth {
  constructor() {
    this._baseUrl = "http://localhost:3001";
    this._headers = {
      "Accept": "application/json",
      "Content-Type": "application/json"
    };
  }

  // метод Обработи ответа
  _getRes(res) {
    if (res.ok) {
      // console.log(`res = ${res}`);
      // console.log(`res.json = ${res.json}`);
      return res.json();

    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  // метод регистрации
  register(email, password) {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ email: email, password: password }) // При РЕГИСТРАЦИИ отправляем введеные данные в формате JSON
    })
      .then((res) => {
        return this._getRes(res);
      })
  }

  // метод авторизации
  authorization(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ email, password }) // При АВТОРИЗАЦИИ отправляем введеные данные в формате JSON
    })
      .then((res) => {
        return this._getRes(res);
      })
  }

  // метод проверки токена на валидность
  validityToken() {
    const token = localStorage.getItem("tokenUser");
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      // credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${token}`, // Добавляем к токену Bearer
      }
    })
      .then((res) => {
        return this._getRes(res)
      })
  }
}

export default new Auth();
