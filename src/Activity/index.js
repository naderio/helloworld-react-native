import { getStore } from '../store';

import * as ActivityState from './state';

export function startProcessing(operationId) {
  getStore().dispatch(ActivityState.startProcessing(operationId));
}

export function stopProcessing(operationId) {
  getStore().dispatch(ActivityState.stopProcessing(operationId));
}
