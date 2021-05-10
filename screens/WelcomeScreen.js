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
    ScrollView,
    ImageBackground,
    Image
    } from 'react-native';

import firebase from 'firebase';
import db from '../config';
import { Icon } from "react-native-elements";
import { RFValue } from "react-native-responsive-fontsize";



export default class WelcomeScreen extends Component{
  constructor(){
    super();
    this.state={
      emailId:'',
      password:'',
      firstName:'',
      lastName:'',
      address:'',
      contact:'',
      confirmPassword:'',
      isModalVisible:'false'
    }
  }

  userSignUp = (emailId, password,confirmPassword) =>{
   if(password !== confirmPassword){
       return alert("password doesn't match\nCheck your password.")
   }else{
     firebase.auth().createUserWithEmailAndPassword(emailId, password)
     .then(()=>{
       db.collection('users').add({
         first_name:this.state.firstName,
         last_name:this.state.lastName,
         contact:this.state.contact,
         email_id:this.state.emailId,
         address:this.state.address
       })
       return  alert(
            'User Added Successfully',
            '',
            [
              {text: 'OK', onPress: () => this.setState({"isModalVisible" : false})},
            ]
        );
     })
     .catch((error)=> {
       // Handle Errors here.
       var errorCode = error.code;
       var errorMessage = error.message;
       return alert(errorMessage)
     });
   }
 }

userLogin = (emailId, password)=>{
   firebase.auth().signInWithEmailAndPassword(emailId, password)
   .then(()=>{
     this.props.navigation.navigate('Friends')  
   })
   .catch((error)=> {
     var errorCode = error.code;
     var errorMessage = error.message;
     return alert(errorMessage)
   })
 }

showModal = ()=>{
  return(
  <Modal
    animationType="fade"
    transparent={true}
    visible={this.state.isModalVisible}
    >
    <View style={styles.modalContainer}>
      <ScrollView style={{width:'100%'}}>
        <KeyboardAvoidingView style={styles.KeyboardAvoidingView}>
        <Text
          style={styles.modalTitle}
          >Registration</Text>
        <TextInput
          style={styles.formTextInput}
          placeholder ={"First Name"}
          maxLength ={8}
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
          onChangeText={(text)=>{
            this.setState({
              emailId: text
            })
          }}
        /><TextInput
          style={styles.formTextInput}
          placeholder ={"Password"}
          secureTextEntry = {true}
          onChangeText={(text)=>{
            this.setState({
              password: text
            })
          }}
        /><TextInput
          style={styles.formTextInput}
          placeholder ={"Confrim Password"}
          secureTextEntry = {true}
          onChangeText={(text)=>{
            this.setState({
              confirmPassword: text
            })
          }}
        />
        <View style={styles.modalBackButton}>
          <TouchableOpacity
            style={styles.registerButton}
            onPress={()=>
              this.userSignUp(this.state.emailId, this.state.password, this.state.confirmPassword)
            }
          >
          <Text style={styles.registerButtonText}>Register</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.modalBackButton}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={()=>this.setState({"isModalVisible":false})}
          >
          <Text style={{color:'#ff5722'}}>Cancel</Text>
          </TouchableOpacity>
        </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  </Modal>
)
}
  render(){
    return(
      <View style={styles.container}>
        <View style={{justifyContent: 'center',alignItems: 'center'}}>
        {this.showModal()}
        </View>
          
       
        <Image source={require("../assets/pic1.png")} style={{width:300, height:300}}/>
        <View>
            <TextInput
            style={styles.loginBox}
            placeholder="abc@example.com"
            keyboardType ='email-address'
            onChangeText={(text)=>{
              this.setState({
                emailId: text
              })
            }}
          />
          <TextInput
          style={styles.loginBox}
          secureTextEntry = {true}
          placeholder="enter Password"
          onChangeText={(text)=>{
            this.setState({
              password: text
            })
          }}
        />
        <TouchableOpacity
           style={[styles.button,{marginBottom:20, marginTop:20}]}
           onPress = {()=>{
             this.userLogin(this.state.emailId, this.state.password)
           }}
           >
           <Text style={styles.buttonText}>Login</Text>
         </TouchableOpacity>

         <TouchableOpacity
           style={styles.button}
           onPress={()=>this.setState({ isModalVisible:true})}
           >
           <Text style={styles.buttonText}>Sign Up</Text>
         </TouchableOpacity>
        
      </View>
    </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
   flex:1,
   backgroundColor:'#00FFF9',
   alignItems: 'center',
   justifyContent: 'center'
 },
 profileContainer:{
   flex:1,
   justifyContent:'center',
   alignItems:'center',
 },
 title :{
   fontSize:RFValue(50),
   fontWeight:'300',
   paddingBottom:RFValue(10),
   color : '#A600FF'
 },
 loginBox:{
   width: RFValue(250),
   height: RFValue(50),
   borderBottomWidth: RFValue(5),
   borderColor : '#A600FF',
   fontSize: RFValue(25),
   margin:RFValue(10),
   paddingLeft:RFValue(10)
 },
 KeyboardAvoidingView:{
   flex:1,
   justifyContent:'center',
   alignItems:'center'
 },
 modalTitle :{
   justifyContent:'center',
   alignSelf:'center',
   fontSize:RFValue(35),
   color:'#A600FF',
   margin:RFValue(55)
 },
 modalContainer:{
   flex:0.7,
   width:RFValue(250), 
   borderRadius:RFValue(25),
   justifyContent:'center',
   alignItems:'center', 
   backgroundColor:"#ffff",
   marginRight:RFValue(150),
   marginLeft : RFValue(150),
   marginTop:RFValue(80),
   marginBottom:RFValue(80),
 },
 formTextInput:{
   width:"80%",
   height:RFValue(50),
   alignSelf:'center',
   borderColor:'#A600FF',
   borderRadius:RFValue(25),
   borderWidth:3,
   marginTop:RFValue(15),
   padding:RFValue(15)
 },
 registerButton:{
   width:RFValue(200),
   height:RFValue(40),
   alignItems:'center',
   justifyContent:'center',
   borderWidth:3,
   borderRadius:RFValue(30),
   marginTop:RFValue(40)
 },
 registerButtonText:{
   color:'#A600FF',
   fontSize:RFValue(25),
   fontWeight:'bold'
 },
 cancelButton:{
   width:RFValue(300),
   height:RFValue(50),
   justifyContent:'center',
   alignItems:'center',
   marginTop:RFValue(5),
   color:'#A600FF',
 },

 button:{
   width:RFValue(230),
   height:RFValue(55),
   alignSelf: 'center', 
   justifyContent:'center',
   alignItems:'center',
   borderRadius:25,
   backgroundColor:"#A600FF",
   shadowColor: "#000",
   shadowOffset: {
      width: RFValue(10),
      height: RFValue(10),
   },
   shadowOpacity: 0.30,
   shadowRadius: 10.32,
   elevation: 16,
   padding: RFValue(20)
 },
 buttonText:{
   color:'#ffff',
   fontWeight:'200',
   fontSize:RFValue(25),
 }
})
