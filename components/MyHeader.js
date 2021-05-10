import React, { Component } from 'react';
import { Header, Icon, Badge } from 'react-native-elements';
import { View, Text, StyeSheet, Alert } from 'react-native';
import db from '../config';

export default class MyHeader extends Component {

  constructor(){
    super();
    this.state = {
      value: ''
    }
  }
 
  getUnreadNotifications=()=>{
    db.collection('all_notifications').where('notification_status', '==', 'unread')
    .onSnapshot((s)=>{
      var n = s.docs.map((doc)=>doc.data())
      this.setState({value: n.length})
    })
  }

  componentDidMount(){
    this.getUnreadNotifications(); 
  }

 BellIcon = (props) => {
   return(
     <View>
       <Icon 
       name= 'bell'
       type = 'font-awesome'
       color = 'black'
       onPress={() => props.navigation.navigate('Notifications')}
       />
       <Badge value={this.state.value} containerStyle={{position:'absolute', top: -8, right: -8}}/> 
     </View>
   )
}
 render(){ 
  return (
    <Header
      leftComponent={
        <Icon
          name="bars"
          type="font-awesome"
          color="black"
          onPress={() => this.props.navigation.toggleDrawer()}
        />
      }
      centerComponent={{
        text: this.props.title,
        style: { color: 'white', fontSize: 20, fontWeight: 'bold' },
      }}
      backgroundColor="#A600FF"
     rightComponent={
       <this.BellIcon {...this.props} />
     }
    />
  );
}
}
