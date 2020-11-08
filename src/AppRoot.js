import React from 'react';

import { Logger } from './common/logger';

import AppProvider from './AppProvider';
import App from './App';

import bootstrap from './bootstrap';

import { getStore } from './store';

class AppRoot extends React.Component {
  async componentDidMount() {
    await bootstrap();
  }

  componentDidCatch(error, info) {
    Logger.error(error, info);
  }

  render() {
    return (
      <React.StrictMode>
        <AppProvider store={getStore()}>
          <App />
        </AppProvider>
      </React.StrictMode>
    );
  }
}

export default AppRoot;
