import React from 'react';
import { AppState } from 'react-native';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator, NavigationActions } from 'react-navigation';

/* screen */
import LoginScreen from 'app/src/screens/LoginScreen';
import HomeScreen from 'app/src/screens/HomeScreen';

/* AppNavigator */
export const AppNavigator = StackNavigator(
  {
    'Login': { screen: LoginScreen },
    'Home': { screen: HomeScreen },
  }
);

const navigateOnce = (getStateForAction) => (action, state) => {
  const { type, routeName } = action;
  return (state && type === NavigationActions.NAVIGATE && routeName === state.routes[state.routes.length - 1].routeName) ? null : getStateForAction(action, state);
};

AppNavigator.router.getStateForAction = navigateOnce(AppNavigator.router.getStateForAction);

/* AppWithNavigationState */
@connect(
  state => ({
    nav: state.nav,
  })
)
export default class AppWithNavigationState extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return <AppNavigator navigation={addNavigationHelpers({ dispatch: this.props.dispatch, state: this.props.nav })} />;
  }
}