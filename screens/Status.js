import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import { RFValue } from 'react-native-responsive-fontsize';
import { SearchBar, ListItem, Input } from 'react-native-elements';
import MyHeader from '../components/MyHeader';

export default class Status extends Component {
 constructor() {
    super();
    this.state = {
     
    };
  }

  render() {
    return (
      <View style={{ flex: 1 }}> 
          <MyHeader title="My Status"/>
     
      </View>
    );
  }
}

const styles = StyleSheet.create({
  
});