import React from 'react';
import { createStackNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import HomeScreen from '../screens/HomeScreen';


// ALTERNATIVE WITH TABS

export default createAppContainer(createSwitchNavigator({
  Main: MainTabNavigator,
}));





/*
// NO TABS, SINGLE PAGE HOME SCREEN


const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

export default createAppContainer(createSwitchNavigator({
  Main: HomeStack,
}));

*/
