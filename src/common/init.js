import './polyfill';

import './events';

import { setupLogger, enableLogger, Logger } from './logger';

import * as CONFIG from './config';

import intl from './intl';

if (process.env.NODE_ENV === 'development') {
  globalThis.Logger = Logger;
  globalThis.CONFIG = CONFIG;
  globalThis.intl = intl;
}

/**
 * Setup Logger
 */

const PREFIX = 'HelloWorld';

setupLogger(PREFIX);

enableLogger(`${PREFIX}*`);
