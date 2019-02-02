import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import SpeciesScreen from '../screens/SpeciesScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Planets',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name='md-planet' 
    />
  ),
};


const SpeciesStack = createStackNavigator({
  Search: SpeciesScreen,
});

SpeciesStack.navigationOptions = {
  tabBarLabel: 'Species',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name='md-eye'
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  SpeciesStack,
});
