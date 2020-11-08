import * as StateHelper from '../common/state.helper';

/**
 * Module name
 */

export const MODULE = 'Session';

/**
 * @typedef {Object} SessionState
 */

/**
 * Initial state
 * @returns {SessionState}
 */

const defineInitialState = () => ({});

/**
 * Reset
 */

export const reset = StateHelper.createAction(MODULE, 'reset', () => reset.action());

/**
 * Reducer
 */

export function reducer(state = defineInitialState(), action) {
  switch (action.type) {
    case reset.TYPE:
      return defineInitialState();
    default:
      return state;
  }
}
