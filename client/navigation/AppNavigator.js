import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import GameScreen from '../screens/GameScreen';
import OtherScreen from '../screens/OtherScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import GlobalStatScreen from '../screens/GlobalStatScreen';
import AnswerScreen from '../screens/AnswerScreen.js';
import StatisticsMenu from '../screens/StatisticsMenu.js';
import CategStatScreen from '../screens/CategStatScreen.js';


const AppStack = createStackNavigator({ Home: HomeScreen, Other: OtherScreen , Game: GameScreen,Global : GlobalStatScreen, Answer : AnswerScreen, StatsMenu : StatisticsMenu, CatStat : CategStatScreen});

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
