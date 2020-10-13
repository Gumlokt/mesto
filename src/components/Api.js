export default class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }


  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject("Произошла ошибка, карточки не получены...");
    });
  }


  addCard(data) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then((res) => {
      console.log(res);

      if (res.ok) {
        return res.json();
      }

      return Promise.reject("Произошла ошибка, новая карточка не добавлена...");
    });
  }


  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject("Произошла ошибка, карточка не удалена...");
    });
  }


  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject("Произошла ошибка, данные пользователя не получены...");
    });
  }


  setUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject("Произошла ошибка, данные пользователя не обновлены...");
    });
  }


  setAvatar() {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject("Произошла ошибка, данные пользователя не обновлены...");
    });
  }


  setLike(id) {
    return fetch(`${this._url}/cards/likes/${id}`, {
      method: "PUT",
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject("Произошла ошибка, лайк не поставлен...");
    });
  }


  unsetLike(id) {
    return fetch(`${this._url}/cards/likes/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject("Произошла ошибка, лайк не удалён...");
    });

  }
}
