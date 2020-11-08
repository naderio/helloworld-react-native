import * as Keychain from 'react-native-keychain';
import { AsyncStorage } from 'react-native';

import { EventEmitter } from '../common/events';
import { API_ENDPOINT } from '../common/config';
import * as FetchHelper from '../common/fetch.helper';

export const AuthServiceImpl = class AuthService {
  events = new EventEmitter();

  username = '';

  password = '';

  accessToken = null;

  getAccessToken() {
    return this.accessToken;
  }

  async _loadSession() {
    const accessToken = await AsyncStorage.getItem('auth.accessToken');
    this.accessToken = accessToken || null;
  }

  async _saveSession(accessToken) {
    this.accessToken = accessToken || null;
    await AsyncStorage.setItem('auth.accessToken', this.accessToken);
  }

  async _clearSession() {
    this.accessToken = null;
    await AsyncStorage.removeItem('auth.accessToken');
  }

  async _loadCredentials() {
    const credentials = await Keychain.getGenericPassword();

    if (credentials) {
      this.username = credentials.username;
      this.password = credentials.password;
    }
  }

  async _saveCredentials(username, password) {
    this.username = username;
    this.password = password;
    await Keychain.setGenericPassword(username, password);
  }

  async _clearCredentials() {
    this.username = '';
    this.password = '';

    await Keychain.resetGenericPassword();
  }

  async initialize() {
    await this._loadSession();
    await this._loadCredentials();
  }

  hasCredentials() {
    return !!this.username && !!this.password;
  }

  isAuthenticated() {
    return !!this.accessToken;
  }

  login(username, password) {
    return FetchHelper.handle(
      fetch(`${API_ENDPOINT}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      }),
    ).then(async ({ data: { accessToken, ...data } }) => {
      await this._saveSession(accessToken);
      await this._saveCredentials(username, password);
      await this.events.emitAsync('login');
      return data;
    });
  }

  async logout() {
    await this.events.emitAsync('logout');
    await this._clearSession();
    await this._clearCredentials();
  }

  signup(payload) {
    const { name, email, password } = payload;

    return FetchHelper.handle(
      fetch(`${API_ENDPOINT}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userAccount: {
            name,
            email,
            password,
          },
          userProfile: {},
        }),
      }),
    ).then(async ({ data: { accessToken, ...data } }) => {
      await this._saveSession(accessToken);
      this._saveCredentials(email, password);
      await this.events.emitAsync('login');
      return data;
    });
  }

  initiatePasswordReset(email) {
    return FetchHelper.handle(
      fetch(`${API_ENDPOINT}/auth/password-reset/initiate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
        }),
      }),
    ).then(({ data }) => data);
  }
};

export const AuthService = new AuthServiceImpl();

if (process.env.NODE_ENV === 'development') {
  globalThis.AuthService = AuthService;
}
