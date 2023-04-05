/* eslint-disable import/no-anonymous-default-export */
class Api {
  constructor() {
    this.API_URL = 'http://localhost:3001';
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
    const token = localStorage.getItem('tokenUser');
    return fetch(`${this.API_URL}/users/me`, {
      method: 'GET',
      // credentials: 'include',
      headers: {
        'Content-type': 'application/json',
        'authorization': `Bearer ${token}`,
      }
    })
      // .then((res) => {
      //     this._getRes(res);
      // })
      // аналогичная запись
      .then(this._getRes)
  }

  // Загрузка карточек с сервера
  getCardsList() {
    const token = localStorage.getItem('tokenUser');
    return fetch(`${this.API_URL}/cards`, {
      method: 'GET',
      // credentials: 'include',
      headers: {
        'Content-type': 'application/json',
        'authorization': `Bearer ${token}`
      }
    })
      .then(this._getRes)
    // проверка
    //   .then((res) => {
    //     console.log(`GetCardsList отработал, получил: ${JSON.stringify(res)}`);
    // })
  }

  // Данные отобразятся только после завешения обоих запросов
  getDataServer() {
    return Promise.all([this.getUserData(), this.getCardsList()]) //Запрос выполнится только при условии выполнении дугих запросов
  }

  // Редактирование данных профиля на сервере
  setUserInfoServer({
    name,
    about
  }) {
    const token = localStorage.getItem('tokenUser');
    return fetch(`${this.API_URL}/users/me`, {
      method: 'PATCH',
      // credentials: 'include',
      headers: {
        'Content-type': 'application/json',
        'authorization': `Bearer ${token}`,
      },
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
    const token = localStorage.getItem('tokenUser');
    return fetch(`${this.API_URL}/cards`, {
      method: 'POST',
      // credentials: 'include',
      headers: {
        'Content-type': 'application/json',
        'authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        link
      })
    })
      .then(this._getRes)
  }

  // Удаление карточки на сервере
  deleteCard(idCard) {
    const token = localStorage.getItem('tokenUser');
    return fetch(`${this.API_URL}/cards/${idCard}`, {
      method: 'DELETE',
      // credentials: 'include',
      headers: {
        'Content-type': 'application/json',
        'authorization': `Bearer ${token}`,
      },
    })
      .then(this._getRes)
  }

  // Вложить данные о лайке на сервер
  addLike(idCard) {
    const token = localStorage.getItem('tokenUser');
    return fetch(`${this.API_URL}/cards/${idCard}/likes`, {
      method: 'PUT',
      // credentials: 'include',
      headers: {
        'Content-type': 'application/json',
        'authorization': `Bearer ${token}`,
      },
    })
      .then(this._getRes)
  }

  // Удаление данных о лайке на сервере
  removeLike(idCard) {
    const token = localStorage.getItem('tokenUser');
    return fetch(`${this.API_URL}/cards/${idCard}/likes`, {
      method: 'DELETE',
      // credentials: 'include',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(this._getRes)
  }

  // Вложить данные о аватаре пользователя
  setUserAvatarServer(linkAvatar) {
    const token = localStorage.getItem('tokenUser');
    return fetch(`${this.API_URL}/users/me/avatar`, {
      method: 'PATCH',
      // credentials: 'include',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        avatar: linkAvatar
      })
    })
      .then(this._getRes)
  }

  // Добавление/удаление лайка
  changeLikeStatus(idCard, isLiked) {
    const token = localStorage.getItem('tokenUser');
    return fetch(`${this.API_URL}/cards/${idCard}/likes`, {
      method: isLiked ? 'DELETE' : 'PUT',
      // credentials: 'include',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(this._getRes)
  }

}

// экспортирую сразу экз класса
export default new Api();