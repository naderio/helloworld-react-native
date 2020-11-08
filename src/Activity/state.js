import * as StateHelper from '../common/state.helper';

/**
 * Module name
 */

export const MODULE = 'Activity';

/**
 * @typedef {Object} ActivityState
 * @property {{ [key: string]: boolean }} processingById
 * @property {boolean} processing
 */

/**
 * Initial state
 * @returns {ActivityState}
 */

const defineInitialState = () => ({
  processingById: {
    default: false,
  },
  processing: false,
});

/**
 * Reset
 */

export const reset = StateHelper.createAction(MODULE, 'reset', () => reset.action());

/**
 * Activity Indicator
 */

export const startProcessing = StateHelper.createAction(MODULE, 'startProcessing', (operation) =>
  startProcessing.action({ operation }),
);

export const stopProcessing = StateHelper.createAction(MODULE, 'stopProcessing', (operation) =>
  stopProcessing.action({ operation }),
);

/**
 * Reducer
 */

export function reducer(state = defineInitialState(), action) {
  switch (action.type) {
    case reset.TYPE:
      return defineInitialState();
    case startProcessing.TYPE: {
      const processingById = {
        ...state.processingById,
        [action.operation]: true,
      };
      return {
        ...state,
        processingById,
        processing: Object.values(processingById).reduce((acc, v) => acc || v, false),
      };
    }
    case stopProcessing.TYPE: {
      const processingById = {
        ...state.processingById,
        [action.operation]: undefined,
      };
      return {
        ...state,
        processingById,
        processing: Object.values(processingById).reduce((acc, v) => acc || v, false),
      };
    }
    default:
      return state;
  }
}
