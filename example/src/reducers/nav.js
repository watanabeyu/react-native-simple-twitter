import { AppNavigator } from 'app/src/navigation/AppNavigator';

const initialState = null;

export default function nav(state = initialState, action) {
  const nextState = AppNavigator.router.getStateForAction(action, state);

  return nextState || state;
}