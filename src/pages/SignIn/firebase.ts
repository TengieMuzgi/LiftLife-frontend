import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyCflgjgR-J2T_Jq9CeLxHkv8GLwG_MILRI',

    authDomain: 'realtime-database-prototype.firebaseapp.com',
  
    databaseURL: 'https://realtime-database-prototype-default-rtdb.europe-west1.firebasedatabase.app',
  
    projectId: 'realtime-database-prototype',
  
    storageBucket: 'realtime-database-prototype.appspot.com',
  
    messagingSenderId: '400989818013',
  
    appId: '1:400989818013:web:f35468ebfb47d550e41874'
  
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, signInWithEmailAndPassword };