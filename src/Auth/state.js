import { API_ENDPOINT } from '../common/config';

import * as FetchHelper from '../common/fetch.helper';
import * as StateHelper from '../common/state.helper';

import * as Activity from '../Activity';

import { AuthService } from './service';

/**
 * Module name
 */

export const MODULE = 'Auth';

/**
 * @typedef {Object} AuthState
 * @property {boolean} authenticated
 * @property {UserAccount} userAccount
 * @property {UserProfile} userProfile
 */

/**
 * Initial state
 * @returns {AuthState}
 */

const defineInitialState = () => ({
  authenticated: false,
  userAccount: null,
  userProfile: null,
});

/**
 * Reset
 */

export const reset = StateHelper.createAction(MODULE, 'reset', () => reset.action());

/**
 * Login
 */

export const login = StateHelper.createAsyncAction(MODULE, 'login', (username, password) => {
  return (dispatch) => {
    Activity.startProcessing(login.ID);
    dispatch(login.request());

    return AuthService.login(username, password)
      .then((result) => dispatch(login.success(result)))
      .catch((error) => dispatch(login.failure(error)))
      .finally(() => Activity.stopProcessing(login.ID));
  };
});

/**
 * Logout
 */

export const logout = StateHelper.createAction(MODULE, 'logout', () => {
  return (dispatch) => {
    dispatch(logout.action());
    return AuthService.logout();
  };
});

/**
 * Signup
 */

export const signup = StateHelper.createAsyncAction(MODULE, 'signup', (payload) => {
  return async (dispatch) => {
    Activity.startProcessing(signup.ID);
    dispatch(signup.request());

    return AuthService.signup(payload)
      .then((result) => dispatch(signup.success(result)))
      .catch((error) => dispatch(signup.failure(error)))
      .finally(() => Activity.stopProcessing(signup.ID));
  };
});

/**
 * Initiate password reset
 */

export const initiatePasswordReset = StateHelper.createAsyncAction(MODULE, 'initiatePasswordReset', (email) => {
  return (dispatch) => {
    Activity.startProcessing(initiatePasswordReset.ID);
    dispatch(initiatePasswordReset.request());

    return AuthService.initiatePasswordReset(email)
      .then((result) => dispatch(initiatePasswordReset.success(result)))
      .catch((error) => dispatch(initiatePasswordReset.failure(error)))
      .finally(() => Activity.stopProcessing(initiatePasswordReset.ID));
  };
});

/**
 * Fetch profile
 */

export const fetchProfile = StateHelper.createAsyncAction(MODULE, 'fetchProfile', () => {
  return (dispatch) => {
    Activity.startProcessing(fetchProfile.ID);
    dispatch(fetchProfile.request());

    return FetchHelper.handle(
      fetch(`${API_ENDPOINT}/self`, {
        headers: {
          Authorization: `Bearer ${AuthService.getAccessToken()}`,
        },
      }),
    )
      .then(({ data }) => dispatch(fetchProfile.success(data)))
      .catch((error) => dispatch(fetchProfile.failure(error)))
      .finally(() => Activity.stopProcessing(fetchProfile.ID));
  };
});

/**
 * Reducer
 */

export function reducer(state = defineInitialState(), action) {
  switch (action.type) {
    case reset.TYPE:
      return defineInitialState();
    case login.REQUEST:
      return {
        ...state,
        userAccount: null,
        userProfile: null,
      };
    case login.SUCCESS:
    case signup.SUCCESS:
    case fetchProfile.SUCCESS: {
      const { userAccount, userProfile } = action;

      const initials = userAccount.name
        .split(/\W+/)
        .map((w) => w[0] || '')
        .join('')
        .toUpperCase();

      return {
        ...state,
        authenticated: true,
        userAccount: {
          ...userAccount,
          initials,
        },
        userProfile,
      };
    }
    case logout.TYPE:
      return {
        ...state,
        authenticated: false,
        userAccount: null,
      };
    default:
      return state;
  }
}

/**
 * Persister
 */

export function persister({ authenticated, userAccount, userProfile }) {
  return {
    authenticated,
    userAccount,
    userProfile,
  };
}
