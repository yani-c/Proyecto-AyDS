import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import GameScreen from '../screens/GameScreen';
import OtherScreen from '../screens/OtherScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import StatisticsScreen from '../screens/StatisticsScreen';
import AnswerScreen from '../screens/AnswerScreen.js';


const AppStack = createStackNavigator({ Home: HomeScreen, Other: OtherScreen , Game: GameScreen,Statistics : StatisticsScreen, Answer : AnswerScreen});

const AuthStack = createStackNavigator({ SignIn: SignInScreen, SignUp: SignUpScreen });
export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));