import firebase from 'firebase';
require('@firebase/firestore')

 const firebaseConfig = {
    apiKey: "AIzaSyDyU8kK9KXbzP43tQfzqCTahkQ5ejNAOKA",
    authDomain: "my-chat-app-fb4f7.firebaseapp.com",
    databaseURL: "https://my-chat-app-fb4f7.firebaseio.com",
    projectId: "my-chat-app-fb4f7",
    storageBucket: "my-chat-app-fb4f7.appspot.com",
    messagingSenderId: "19409834643",
    appId: "1:19409834643:web:3ef909e249246ed352b366"
  };
 
// Initialize Firebase
if(!firebase.apps.length){
firebase.initializeApp(firebaseConfig);
}
 
export default firebase.firestore(); 
