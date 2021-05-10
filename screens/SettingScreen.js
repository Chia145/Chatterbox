import React,{Component}from 'react';
import {
    View,
    Text,
    TextInput,
    Modal,
    KeyboardAvoidingView,
    StyleSheet,
    TouchableOpacity,
    Alert,
    ScrollView} from 'react-native';

import db from '../config';
import MyHeader from '../components/MyHeader';
import firebase from 'firebase';

export default class SettingScreen extends Component{

  constructor(){
    super()
    this.state={
      emailId: '',
      firstName: '',
      lastName : '',
      address: '',
      contact: '',
      docId : '',
    }
  }

  getDetails=()=>{
    var email = firebase.auth().currentUser.email;
   // var email = user.email;
    db.collection('users').where('email_id','==', email).get()
      .then(snapshot=>{
        snapshot.forEach(doc=>{
           var data = doc.data();
           this.setState({
             emailId : data.email_id,
             firstName: data.first_name,
             lastName: data.last_name,
             address: data.address,
             contact: data.contact,
             docId: doc.id, 
           })
        }); 
      })
  }
 updateDetails=()=>{
    db.collection('users').doc(this.state.docId).update({
      'email_Id': this.state.emailId,
      'first_Name': this.state.firstName,
      'last_Name' : this.state.lastName,
      'address': this.state.address,
      'contact': this.state.contact,
    })
    alert('Profile Updated')
  }
  componentDidMount(){
    this.getDetails()
  }

  render(){
    return(
      <View>
        <MyHeader title='Settings' navigation = {this.props.navigation} />
        <View style = {styles.formContainer}> 
          <TextInput
          style={styles.formTextInput}
          placeholder ={"First Name"}
          maxLength ={8}
          value = {this.state.firstName}
          onChangeText={(text)=>{
            this.setState({
              firstName: text
            })
          }}
        />
        <TextInput
          style={styles.formTextInput}
          placeholder ={"Last Name"}
          maxLength ={8}
          value = {this.state.lastName}
          onChangeText={(text)=>{ 
            this.setState({
              lastName: text
            })
          }}
        />
        <TextInput
          style={styles.formTextInput}
          placeholder ={"Contact"}
          maxLength ={10}
          value = {this.state.contact}
          keyboardType={'numeric'}
          onChangeText={(text)=>{
            this.setState({
              contact: text
            })
          }}
        />
        <TextInput
          style={styles.formTextInput}
          placeholder ={"Address"}
          multiline = {true}
          value = {this.state.address}
          onChangeText={(text)=>{
            this.setState({
              address: text
            })
          }}
        />
        <TextInput
          style={styles.formTextInput}
          placeholder ={"Email"}
          keyboardType ={'email-address'}
          value = {this.state.emailId}
          onChangeText={(text)=>{
            this.setState({
              emailId: text
            })
          }}
        />
        <TouchableOpacity style = {styles.button} onPress={()=>{this.updateDetails}}> 
          <Text style = {styles.buttonText}> Save </Text>
        </TouchableOpacity>
        </View>
      </View>
    ) //ag@gmail.com
  }
}

const styles = StyleSheet.create({
  
 formTextInput:{
   width:"75%",
   height:35,
   alignSelf:'center',
   borderColor:'#A600FF',
   borderRadius:10,
   borderWidth:1,
   marginTop:20,
   padding:10
 },

 button:{
   width:300,
   height:50,
   marginTop:20,
   justifyContent:'center',
   alignItems:'center',
   borderRadius:25,
   backgroundColor:"#A600FF",
   shadowColor: "#000",
   shadowOffset: {
      width: 0,
      height: 8,
   },
   shadowOpacity: 0.30,
   shadowRadius: 10.32,
   elevation: 16,
   padding: 10
 },
 buttonText:{
   color:'#ffff',
   fontWeight:'200',
   fontSize:20
 }
})

