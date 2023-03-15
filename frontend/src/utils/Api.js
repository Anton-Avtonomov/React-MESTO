/* eslint-disable import/no-anonymous-default-export */
class Api {
  constructor() {
    this.SERVER_URL = 'http://localhost:3001';
  }

  // метод Обработи ответа
  _getRes(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  // Закгрузка данных о пользователе
  getUserData() {
    return fetch(`${this.SERVER_URL}/users/me`, {
      method: 'GET',
      credentials: "include",
      headers: this._token
    })
      // .then((res) => {
      //     this._getRes(res);
      // })
      // аналогичная запись
      .then(this._getRes)
  }

  // Загрузка карточек с сервера
  getCardsList() {
    return fetch(`${this.SERVER_URL}/cards`, {
      method: 'GET',
      credentials: "include",
      headers: this._token
    })
      .then(this._getRes)
  }

  // Данные отобразятся только после завешения обоих запросов
  getDataServer() {
    return Promise.all([this.getUserData(), this.getCardsList()])
  }

  // Редактирование данных профиля на сервере
  setUserInfoServer({
    name,
    about
  }) {
    return fetch(`${this.SERVER_URL}/users/me`, {
      method: 'PATCH',
      credentials: "include",
      headers: this._token,
      body: JSON.stringify({
        name,
        about
      })
    })
      .then(this._getRes)
  }

  // Отправка новой карточки на сервер
  pushNewcard({
    name,
    link
  }) {
    return fetch(`${this.SERVER_URL}/cards`, {
      method: 'POST',
      credentials: "include",
      headers: this._token,
      body: JSON.stringify({
        name,
        link
      })
    })
      .then(this._getRes)
  }

  // Удаление карточки на сервере
  deleteCard(idCard) {
    return fetch(`${this.SERVER_URL}/cards/${idCard}`, {
      method: 'DELETE',
      credentials: "include",
      headers: this._token,
    })
      .then(this._getRes)
  }

  // Вложить данные о лайке на сервер
  addLike(idCard) {
    return fetch(`${this.SERVER_URL}/cards/${idCard}/likes`, {
      method: 'PUT',
      credentials: "include",
      headers: this._token,
    })
      .then(this._getRes)
  }

  // Удаление данных о лайке на сервере
  removeLike(idCard) {
    return fetch(`${this.SERVER_URL}/cards/${idCard}/likes`, {
      method: 'DELETE',
      credentials: "include",
      headers: this._token,
    })
      .then(this._getRes)
  }

  // Вложить данные о аватаре пользователя
  setUserAvatarServer(linkAvatar) {
    return fetch(`${this.SERVER_URL}/users/me/avatar`, {
      method: 'PATCH',
      credentials: "include",
      headers: this._token,
      body: JSON.stringify({
        avatar: linkAvatar
      })
    })
      .then(this._getRes)
  }

  // Добавление/удаление лайка
  changeLikeStatus(idCard, checkStatusLike) {
    return fetch(`${this.SERVER_URL}/cards/${idCard}/likes`, {
      method: checkStatusLike ? 'DELETE' : 'PUT',
      credentials: "include",
      headers: this._token,
    })
      .then(this._getRes)
  }

}

// экспортирую сразу экз класса
export default new Api();