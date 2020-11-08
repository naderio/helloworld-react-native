import * as StateHelper from '../common/state.helper';

import $state from '../store/state';

/**
 * Module name
 */

export const MODULE = 'Shared';

/**
 * @typedef {Object} SharedState
 * @property {boolean} appReady
 * @property {boolean} appInSession
 * @property {boolean} keyboardVisible
 */

/**
 * Initial state
 * @returns {SharedState}
 */

const defineInitialState = () => ({
  appReady: false,
  appInSession: false,
  keyboardVisible: false,
});

/**
 * initialize app
 */

export const initializeApp = StateHelper.createAction(MODULE, 'initializeApp', () => {
  return async (dispatch) => {
    await Promise.all([
      new Promise((resolve) => setTimeout(resolve, 1000)),
      // dispatch(loadSomething()),
    ]);

    return dispatch(initializeApp.action());
  };
});

/**
 * initialize and start session
 */

export const startSession = StateHelper.createAction(MODULE, 'startSession', () => {
  return async (dispatch) => {
    await Promise.all([
      new Promise((resolve) => setTimeout(resolve, 2000)),
      // dispatch(loadSomething()),
    ]);

    return dispatch(startSession.action());
  };
});

/**
 * close and cleanup session
 */

export const closeSession = StateHelper.createAction(MODULE, 'closeSession', () => {
  return async (dispatch) => {
    Object.values($state).forEach((state) => {
      if (state.reset) {
        dispatch(state.reset());
      }
    });

    return dispatch(closeSession.action());
  };
});

/**
 * set keyboard visibility
 */

export const setKeyboardVisible = StateHelper.createAction(MODULE, 'setKeyboardVisible', (value) => {
  return async (dispatch) => {
    return dispatch(setKeyboardVisible.action({ value }));
  };
});

/**
 * Reducer
 */

export function reducer(state = defineInitialState(), action) {
  switch (action.type) {
    case initializeApp.TYPE:
      return {
        ...state,
        appReady: true,
      };
    case startSession.TYPE:
      return {
        ...state,
        appInSession: true,
      };
    case closeSession.TYPE:
      return {
        ...state,
        appInSession: false,
      };
    case setKeyboardVisible.TYPE:
      return {
        ...state,
        keyboardVisible: action.value,
      };
    default:
      return state;
  }
}
