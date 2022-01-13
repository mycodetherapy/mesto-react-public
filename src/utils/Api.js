import { configApi } from "./constants"

 class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  _onError = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo = () => {
    return fetch(`${this._url}users/me`, {
      method: "GET",
      headers: this._headers,
    }).then(this._onError);
  };

  setUserInfo = (data) => {
    return fetch(`${this._url}users/me`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then(this._onError);
  };

  getCards = () => {
    return fetch(`${this._url}cards`, {
      method: "GET",
      headers: this._headers,
    }).then(this._onError);
  };

  addCard = (data) => {
    return fetch(`${this._url}cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then(this._onError);
  };

  removeCard = (dataId) => {
    return fetch(`${this._url}cards/${dataId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._onError);
  };

  setUserInfo = (userData) => {
    return fetch(`${this._url}users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(userData),
    }).then(this._onError);
  };

  setAvatar = (avatar) => {
    return fetch(`${this._url}users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(avatar),
    }).then(this._onError);
  };

  toggleLike = (method, dataId) => {
    return fetch(`${this._url}cards/likes/${dataId}`, {
      method: method,
      headers: this._headers,
    }).then(this._onError);
  };
}

const api = new Api(configApi);
export default api;
