import { API_ENDPOINT } from '../common/config';

import * as FetchHelper from '../common/fetch.helper';
import * as StateHelper from '../common/state.helper';

import { AuthService } from '../Auth/service';

import * as Activity from '../Activity';

/**
 * Module name
 */

export const MODULE = 'Home';

/**
 * @typedef {Object} HomeState
 * @property {Post[]} posts
 */

/**
 * Initial state
 * @returns {HomeState}
 */

const defineInitialState = () => ({
  posts: null,
});

/**
 * Reset
 */

export const reset = StateHelper.createAction(MODULE, 'reset', () => reset.action());

/**
 * Fetch posts
 */

// Promise implementation
const fetchPostsPromise = StateHelper.createAsyncAction(MODULE, 'fetchPosts', () => {
  return (dispatch) => {
    Activity.startProcessing(fetchPostsPromise.ID);
    dispatch(fetchPostsPromise.request());

    return FetchHelper.handle(
      fetch(`${API_ENDPOINT}/user/post/collection`, {
        headers: {
          Authorization: `Bearer ${AuthService.getAccessToken()}`,
        },
      }),
    )
      .then(({ data }) => dispatch(fetchPostsPromise.success(data)))
      .catch((error) => dispatch(fetchPostsPromise.failure(error)))
      .finally(() => Activity.stopProcessing(fetchPostsPromise.ID));
  };
});

// async/await implementation
export const fetchPosts = StateHelper.createAsyncAction(MODULE, 'fetchPosts', () => {
  return async (dispatch) => {
    Activity.startProcessing(fetchPosts.ID);
    dispatch(fetchPosts.request());

    try {
      const { data } = await FetchHelper.handle(
        fetch(`${API_ENDPOINT}/user/post/collection`, {
          headers: {
            Authorization: `Bearer ${AuthService.getAccessToken()}`,
          },
        }),
      );
      return dispatch(fetchPosts.success(data));
    } catch (error) {
      return dispatch(fetchPosts.failure(error));
    } finally {
      Activity.stopProcessing(fetchPosts.ID);
    }
  };
});

/**
 * Create post
 */

export const createPost = StateHelper.createAsyncAction(MODULE, 'createPost', (data) => {
  return (dispatch) => {
    Activity.startProcessing(createPost.ID);
    dispatch(createPost.request());

    return FetchHelper.handle(
      fetch(`${API_ENDPOINT}/user/post/create`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${AuthService.getAccessToken()}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data,
        }),
      }),
    )
      .then(({ data }) => dispatch(createPost.success(data)))
      .catch((error) => dispatch(createPost.failure(error)))
      .finally(() => Activity.stopProcessing(createPost.ID));
  };
});

/**
 * Update post
 */

export const updatePost = StateHelper.createAsyncAction(MODULE, 'updatePost', (postId, data) => {
  return (dispatch) => {
    Activity.startProcessing(updatePost.ID);
    dispatch(updatePost.request());

    return FetchHelper.handle(
      fetch(`${API_ENDPOINT}/user/post/${postId}/edit`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${AuthService.getAccessToken()}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data,
        }),
      }),
    )
      .then(({ data }) => dispatch(updatePost.success(data)))
      .catch((error) => dispatch(updatePost.failure(error)))
      .finally(() => Activity.stopProcessing(updatePost.ID));
  };
});

/**
 * Remove post
 */

export const removePost = StateHelper.createAsyncAction(MODULE, 'removePost', (postId) => {
  return (dispatch) => {
    Activity.startProcessing(removePost.ID);
    dispatch(removePost.request());

    return FetchHelper.handle(
      fetch(`${API_ENDPOINT}/user/post/${postId}/delete`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${AuthService.getAccessToken()}`,
        },
      }),
    )
      .then(() => dispatch(fetchPosts()))
      .catch((error) => dispatch(removePost.failure(error)))
      .finally(() => Activity.stopProcessing(removePost.ID));
  };
});

/**
 * Reducer
 */

export function reducer(state = defineInitialState(), action) {
  switch (action.type) {
    case reset.TYPE:
      return defineInitialState();
    case fetchPosts.REQUEST:
      return {
        ...state,
        posts: null,
      };
    case fetchPosts.SUCCESS:
      return {
        ...state,
        posts: action.data,
      };
    case createPost.SUCCESS:
      return {
        ...state,
        posts: [...state.posts, action.data],
      };
    case updatePost.SUCCESS:
      return {
        ...state,
        posts: state.posts.map((item) => (action.data.id === item.id ? action.data : item)),
      };
    case fetchPosts.FAILURE:
      return {
        ...state,
        posts: null,
      };
    default:
      return state;
  }
}

/**
 * Persister
 */

export function persister({ posts }) {
  return {
    posts,
  };
}
