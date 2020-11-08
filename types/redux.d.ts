import { Action } from 'redux';
import { ThunkDispatch, ThunkAction } from 'redux-thunk';

import type { GlobalState } from '../src/store/state';

type CustomState = GlobalState;

type CustomDispatch<A extends Action = AnyAction> = ThunkDispatch<CustomState, any, Action>;

type CustomAction<R = any> = ThunkAction<R extends Promise<infer T> ? R : R | Promise<R>, CustomState, any, Action>;

module 'react-redux' {
  interface DefaultRootState extends CustomState {}
  function useDispatch<A extends Action = AnyAction>(): CustomDispatch<A>;
}

declare global {
  type StoreState = CustomState;
  type StoreAction = CustomAction;
}
