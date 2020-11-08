import { ViewPropTypes } from 'react-native';
import * as PropTypes from './proptypes';

export * from './proptypes';

/**
 * General Purpose
 */

export const { style } = ViewPropTypes;

/**
 * Routing
 */

export const withRouting = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    goBack: PropTypes.func,
    addListener: PropTypes.func,
    isFocused: PropTypes.func,
    // state: PropTypes.object,
    state: PropTypes.shape({
      routeName: PropTypes.string,
      key: PropTypes.string,
      params: PropTypes.shape({}),
    }),
    setParams: PropTypes.func,
    getParam: PropTypes.func,
    dispatch: PropTypes.func,
    push: PropTypes.func,
    pop: PropTypes.func,
    popToTop: PropTypes.func,
    replace: PropTypes.func,
  }).isRequired,
};
