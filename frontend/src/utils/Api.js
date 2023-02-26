class Api {
    constructor(config) {
        this._address = config.url;
        this._token = config.headers;
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
        return fetch(`${this._address}/users/me`, {
                method: 'GET',
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
        return fetch(`${this._address}/cards`, {
                method: 'GET',
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
        return fetch(`${this._address}/users/me`, {
                method: 'PATCH',
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
        return fetch(`${this._address}/cards`, {
                method: 'POST',
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
        return fetch(`${this._address}/cards/${idCard}`, {
                method: 'DELETE',
                headers: this._token,
            })
            .then(this._getRes)
    }

    // Вложить данные о лайке на сервер
    addLike(idCard) {
        return fetch(`${this._address}/cards/${idCard}/likes`, {
                method: 'PUT',
                headers: this._token,
            })
            .then(this._getRes)
    }

    // Удаление данных о лайке на сервере
    removeLike(idCard) {
        return fetch(`${this._address}/cards/${idCard}/likes`, {
                method: 'DELETE',
                headers: this._token,
            })
            .then(this._getRes)
    }

    // Вложить данные о аватаре пользователя
    setUserAvatarServer(linkAvatar) {
        return fetch(`${this._address}/users/me/avatar`, {
                method: 'PATCH',
                headers: this._token,
                body: JSON.stringify({
                    avatar: linkAvatar
                })
            })
            .then(this._getRes)
    }
    
// Добавление/удаление лайка
    changeLikeStatus(idCard, checkStatusLike) {
        return fetch(`${this._address}/cards/${idCard}/likes`, {
            method: checkStatusLike ? 'DELETE' : 'PUT',
            headers: this._token,
        })
        .then(this._getRes)
    }

}

// экспортирую сразу экз класса
export default new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-49',
    headers: {
        authorization: 'e0f40131-d89a-4c5d-97a8-e3c19ffbc3e6',
        'Content-Type': 'application/json'
    }
});