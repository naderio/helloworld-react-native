# State Helper

## Usage

### Import

```javascript
import * as StateHelper from '../redux/state.helper';
```

### `StateHelper.createAction`

```javascript
const MODULE = 'Post';

const defineInitialState = () => ({
  item: null,
});

const selectItem = StateHelper.createAction(MODULE, 'selectItem', (item) => {
  return (dispatch) => {
    dispatch(selectItem.action({ item  }));

    return FetchHelper.handle(fetch(`${API_ENDPOINT}/post/${item.id}`))
      .then(({ data }) => dispatch(selectItem.action({ item: data.item }));
  };
});

export function reducer(state = defineInitialState(), action) {
  switch (action.type) {
    case selectItem.TYPE:
      return {
        ...state,
        item: action.item,
      };
    default:
      return state;
  }
}

// `dispatch(selectItem(item))` in components
```

### `StateHelper.createAsyncAction`

```javascript
const MODULE = 'Post';

const defineInitialState = () => ({
  posts: null,
});

const fetchPosts = StateHelper.createAsyncAction(MODULE, 'fetchPosts', () => {
  return (dispatch) => {
    dispatch(fetchPosts.request());
    return FetchHelper.handle(fetch(`${API_ENDPOINT}/post`))
      .then(({ data }) => dispatch(fetchPosts.success({ posts: data.data })))
      .catch((error) => dispatch(fetchPosts.failure(error)));
  };
});

export function reducer(state = defineInitialState(), action) {
  switch (action.type) {
    case fetchPosts.REQUEST:
      return {
        ...state,
        posts: null,
      };
    case fetchPosts.SUCCESS:
      return {
        ...state,
        posts: action.posts,
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

// `dispatch(fetchPosts())` in components
```
