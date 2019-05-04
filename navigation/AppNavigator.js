import { createAppContainer, createSwitchNavigator } from "react-navigation";
import OnboardingScreen from "../screens/OnboardingScreen";
import { createStackNavigator } from "react-navigation";
import HomeScreen from "../screens/HomeScreen";
import SettingsScreen from "../screens/SettingsScreen";

const AppStack = createStackNavigator({
  Home: HomeScreen,
  Settings: SettingsScreen
});

const RootNavigation = createSwitchNavigator({
  Home: AppStack
});

export default createAppContainer(
  createSwitchNavigator({
    Main: RootNavigation,
    Onboarding: OnboardingScreen
  })
);
