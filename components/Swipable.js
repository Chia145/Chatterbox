import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native'; 
import { Icon, ListItem } from 'react-native-elements';
import db from '../config';
import { SwipeListView } from 'react-native-swipe-list-view';

export default class Swipable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allNotifications: this.props.allNotifications, //allNotifications
    };
  }

  renderItem = (data) => (
    <Animated.View>
      <ListItem
      //  leftElement={<Icon name="sync" type="font-awesome" color="#696969" />}
        title={data.item.item}
        subtitle={data.item.message}
        bottomDivider
      />
    </Animated.View>
  );

  renderHiddenItem = () => (
    <View> <Text style={{fontSize:20,color:"RED"}}> Read </Text> </View>
  )

  update = (n) => {
    db.collection('all_notifications')
    .doc(n.doc_id)
    .update({
      'notification_status' : "Read"
    })
  }

  onSwipeValueChange = (data) => {
    var n = this.state.allNotifications
    const {key, value} = data
    if( value < -Dimensions.get('window').width){
      const a = [...n]
      const preIndex = n.findIndex(i => i.key === key)
      this.update(n[preIndex])
      a.splice(preIndex, 1)
      this.setState({allNotifications:a})
      this.update;
    }

  }

  render() {
    return (
      <View>
        <SwipeListView
          disableRightSwipe
          data={this.state.allNotifications}
          renderItem={this.renderItem}
          renderHiddenItem={this.renderHiddenItem}
          rightOpenValue={-Dimensions.get('window').width} //very important
          previewRowKey={'0'}
          previewOpenValue={-40}
          previewOpenDelay={3000}
          onSwipeValueChange={this.onSwipeValueChange}
           
        />
      </View>
    );
  }
}
