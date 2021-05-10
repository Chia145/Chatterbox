import React from 'react';
import { Image } from 'react-native';
import {Icon} from 'react-native-elements';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import FriendsList from '../screens/FriendsList';
import Status from '../screens/Status';
import {AppStackNavigator} from './AppStackNavigator'  


export const AppTabNavigator = createBottomTabNavigator({
  Friends : {
    screen: AppStackNavigator,
    navigationOptions :{
      tabBarIcon : <Image source={require("../assets/pic2.webp")} style={{width:50, height:50}}/>,
      tabBarLabel : "Friends' List",
    }
  }, 
  Status: {
    screen: Status,
    navigationOptions :{
      tabBarIcon : <Icon 
       name= 'hurricane'
       type = 'font-awesome'
       color = 'black'
       />,
      tabBarLabel : "Status",
    }
  },
  
});
