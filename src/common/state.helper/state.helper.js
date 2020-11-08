/**
 * @typedef {Object} ActionFunction
 * @prop {string} MODULE
 * @prop {string} NAME
 * @prop {string} ID
 * @prop {string} TYPE
 * @prop {function} action
 */

/**
 * Action creator factory for regular operation
 *
 * @template {Function} T
 * @param {string} module
 * @param {string} name
 * @param {T} action
 * @returns {(T | Function) & ActionFunction} input action augmented by helpers
 */

export function createAction(module, name, action = null) {
  const ID = `${module}.${name}`;

  const TYPE = `${ID}.ACTION`;

  const config = {
    MODULE: module,
    NAME: name,
    ID,

    TYPE,
    action(payload = {}) {
      return {
        type: TYPE,
        ...payload,
      };
    },
  };

  const result = Object.assign(action || (() => {}), config);

  return result;
}

/**
 * @typedef {Object} AsyncActionFunction
 * @prop {string} MODULE
 * @prop {string} NAME
 * @prop {string} ID
 * @prop {string} REQUEST
 * @prop {function} request
 * @prop {string} SUCCESS
 * @prop {function} success
 * @prop {string} FAILURE
 * @prop {function} failure
 */

/**
 * Action creators factory for typical async operation
 *
 * @template {Function} T
 * @param {string} module
 * @param {string} name
 * @param {T} action
 * @returns {(T | Function) & AsyncActionFunction} input action augmented by helpers
 */

export function createAsyncAction(module, name, action = null) {
  const ID = `${module}.${name}`;

  const REQUEST = `${ID}.REQUEST`;
  const SUCCESS = `${ID}.SUCCESS`;
  const FAILURE = `${ID}.FAILURE`;

  const config = {
    MODULE: module,
    NAME: name,
    ID,

    REQUEST,
    request(input = {}) {
      return {
        type: REQUEST,
        ...input,
      };
    },

    SUCCESS,
    success(output = {}) {
      return (dispatch) => {
        dispatch({
          type: SUCCESS,
          ...output,
        });

        return output;
      };
    },

    FAILURE,
    failure(error) {
      return (dispatch) => {
        dispatch({
          type: FAILURE,
        });

        throw error;
      };
    },
  };

  const result = Object.assign(action || (() => {}), config);

  return result;
}
