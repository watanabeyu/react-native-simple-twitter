import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers';

/* from app */
import reducers from 'rnstexampleapp/src/reducers';

const logger = store => next => (action) => {
  if (__DEV__) {
    if (action.type.indexOf('Navigation') === -1) {
      console.log(action);
    }
  }
  next(action);
};

/* create store */
const store = createStore(
  combineReducers({ ...reducers }),
  applyMiddleware(
    createReactNavigationReduxMiddleware(
      'root',
      state => state.nav,
    ),
    logger,
  ),
);

export default store;
