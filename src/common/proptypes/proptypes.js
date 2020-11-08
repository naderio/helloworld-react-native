import * as PropTypes from 'prop-types';

import * as CONST from '../const';

export * from 'prop-types';

/**
 * General Purpose
 */

export const ID = PropTypes.string;

export const URI = PropTypes.string;

export const UserRole = PropTypes.oneOf(Object.values(CONST.ROLE));

export const UserAccount = PropTypes.shape({
  id: ID.isRequired,
  role: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  emailVerified: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  pictureUrl: URI.isRequired,
});

export const UserProfile = PropTypes.shape({
  id: ID.isRequired,
});

export const Post = PropTypes.shape({
  id: ID.isRequired,
  title: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  pictureUrl: URI.isRequired,
  createdAt: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired,
});

/**
 * State Management
 */

export const withState = {
  dispatch: PropTypes.func.isRequired,
};
