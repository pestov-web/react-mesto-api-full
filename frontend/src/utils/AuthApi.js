class AuthApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
    this._credentials = options.credentials;
  }

  // возвращаем ошибку в случае ошибки =)
  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`ошибка ! : ${res.status}`);
  }

  // регистрируем пользователя
  register(password, email) {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ password, email }),
      credentials: this._credentials,
    }).then(this._handleResponse);
  }
  // авторизация пользователя
  authorize(password, email) {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ password, email }),
      credentials: this._credentials,
    }).then(this._handleResponse);
  }

  // проверяем токен
  checkToken() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._headers,
      credentials: this._credentials,
    }).then(this._handleResponse);
  }

  logOut() {
    return fetch(`${this._baseUrl}/signout`, {
      method: "POST",
      headers: this._headers,
      credentials: this._credentials,
    }).then(this._handleResponse);
  }
}

const auth = new AuthApi({
  baseUrl: "https://api2.pestov-web.ru",
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  credentials: 'include',
});

export default auth;
