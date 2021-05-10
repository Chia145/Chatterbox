import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

import AppDrawerNavigator from './AppDrawerNavigator';
import FriendsList from '../screens/FriendsList';


export const AppStackNavigator = createStackNavigator({
  ExchangeScreen : {
    screen : FriendsList,
    navigationOptions : {headerShown: false}
    },
 },  
  {
    initialRouteName : 'ExchangeScreen'
  })