import AppContainer from './src/AppContainer';
import * as firebase from 'firebase';

// Initialize Firebase
const firebaseConfig = {
    apiKey: 'AIzaSyBt4NI4S_uPNjzgu5hr-pOC-yduO3QKivU',
    authDomain: 'expo-firebase-phone-auth.firebaseapp.com',
    databaseURL: 'https://expo-firebase-phone-auth.firebaseio.com',
    projectId: 'expo-firebase-phone-auth',
    storageBucket: 'expo-firebase-phone-auth.appspot.com',
    messagingSenderId: '139234022839'
};

firebase.initializeApp(firebaseConfig);

export default AppContainer;
