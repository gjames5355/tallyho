import config from '../config';
import TokenService from './token-service';

const AuthApiService = {
  postLogin(credentials) {
    return fetch(`${config.API_ENDPOINT}/auth/login`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(credentials),
    }).then(res =>
      !res.ok ? res.json().then(event => Promise.reject(event)) : res.json()
    );
  },
  postUser(user) {
    return fetch(`${config.API_ENDPOINT}/users`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(user),
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },
  refreshToken() {
    return fetch(`${config.API_ENDPOINT}/auth/token`, {
      method: 'PUT',
      headers: {
        authorization: `Bearer ${TokenService.getAuthToken()}`,
      },
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },
};

export default AuthApiService;
