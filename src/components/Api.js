export default class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }


  getInitialCards() {
    return fetch(this._url, {
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
          return res.json();
      }

      return Promise.reject("Произошла ошибка");
    });
  }


  addCard() {
    return fetch(this._url, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.ok) {
          return res.json();
      }

      return Promise.reject("Произошла ошибка");
    });
  }


  deleteCard() {
    return fetch(`${this._url}/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
          return res.json();
      }

      return Promise.reject("Произошла ошибка");
    });
  }


  getUserInfo() {
    // ...
  }


  setUserInfo() {
    // ...
  }


  setAvatar() {
    // ...
  }


  setLike() {
    // ...
  }


  unsetLike() {
    // ...
  }
}
