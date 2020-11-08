// @ts-nocheck
/* eslint-disable global-require */

/**
 * Intl
 */

if (!globalThis.Intl) {
  require('intl');
  require('intl/locale-data/jsonp/en');
  require('intl/locale-data/jsonp/fr');
}
