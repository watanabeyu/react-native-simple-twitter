import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

/* screen */
import LoginScreen from 'app/src/screens/LoginScreen';
import HomeScreen from 'app/src/screens/HomeScreen';

/* AppNavigator */
const AppNavigator = createStackNavigator(
  {
    Login: { screen: LoginScreen },
    Home: { screen: HomeScreen },
  },
  {
    initialRouteName: 'Login',
  },
);

export default createAppContainer(AppNavigator);
