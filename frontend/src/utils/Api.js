class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
    this._credentials = options.credentials;
  }

  // возвращаем ошибку в случае ошибки =)
  _handleResponse(res) {
    if (res.ok) return res.json();

    return Promise.reject(`ошибка ! : ${res.status}`);
  }

  // получаем начальные карточки
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: this._headers,
      credentials: this._credentials,
    }).then((res) => this._handleResponse(res));
  }

  // получаем информацию о пользователе с сервера
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._headers,
      credentials: this._credentials,
    }).then((res) => this._handleResponse(res));
  }

  // обновляем информацию о пользователе
  patchUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
      credentials: this._credentials,
    }).then((res) => this._handleResponse(res));
  }

  // обновляем аватар пользователя
  patchUserAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
      credentials: this._credentials,
    }).then((res) => this._handleResponse(res));
  }

  // добавляем новую карточку
  postNewCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
      credentials: this._credentials,
    }).then((res) => this._handleResponse(res));
  }

  // удаляем карточку
  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
      credentials: this._credentials,
    }).then((res) => this._handleResponse(res));
  }

  changeLikeCardStatus(id, isLiked) {
    if (isLiked) {
      return this._deleteLike(id);
    } else {
      return this._setLike(id);
    }
  }

  // лайкаем карточку
  _setLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "PUT",
      headers: this._headers,
      credentials: this._credentials,
    }).then((res) => this._handleResponse(res));
  }

  // удаляем лайк
  _deleteLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "DELETE",
      headers: this._headers,
      credentials: this._credentials,
    }).then((res) => this._handleResponse(res));
  }
}

const api = new Api({
  baseUrl: "https://api2.pestov-web.ru",
  headers: {
    // authorization: "13487b8e-c128-4492-9187-00285c5e1c9d",
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  credentials: 'include',
});

export default api;
