/**
 * App bootstrap
 */

import { getStore } from './store';

import * as FetchHelper from './common/fetch.helper';

import { AuthService } from './Auth/service';

import * as AuthState from './Auth/state';

import * as SharedState from './Shared/state';

import * as Interaction from './Shared/Interaction';

export default async function bootstrap() {
  const { dispatch, getState } = getStore();

  await AuthService.initialize();

  if (!AuthService.isAuthenticated() && getState().Auth.authenticated) {
    dispatch(AuthState.reset());

    await dispatch(SharedState.closeSession());
  } else if (AuthService.isAuthenticated() && !getState().Auth.authenticated) {
    await AuthService.logout();
  }

  AuthService.events.on('login', () => {
    dispatch(SharedState.startSession()).catch((error) =>
      Interaction.toast({ type: Interaction.FAILURE, content: error.message }),
    );
  });

  AuthService.events.on('logout', () => {
    dispatch(SharedState.closeSession()).catch((error) =>
      Interaction.toast({ type: Interaction.FAILURE, content: error.message }),
    );
  });

  FetchHelper.events.on('failure', ({ meta }) => {
    if (AuthService.isAuthenticated() && meta.status === 401) {
      dispatch(AuthState.logout());
    }
  });

  await dispatch(SharedState.initializeApp());

  if (AuthService.isAuthenticated()) {
    await dispatch(SharedState.startSession()).catch((error) =>
      Interaction.toast({ type: Interaction.FAILURE, content: error.message }),
    );
  }
}
