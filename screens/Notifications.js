import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { ListItem } from 'react-native-elements';
import firebase from 'firebase';
import db from '../config';
import MyHeader from '../components/MyHeader';

export default class Notifications extends Component {
  constructor() {
    super();
    this.state = {
     
    }; 
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
       <MyHeader title="My Notifications"/>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  
});
