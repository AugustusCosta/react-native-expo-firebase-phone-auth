import AppContainer from './src/AppContainer';
import * as firebase from 'firebase';

// Initialize Firebase
const firebaseConfig = {
    apiKey: '',
    authDomain: '',
    databaseURL: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: ''
};

firebase.initializeApp(firebaseConfig);

export default AppContainer;
