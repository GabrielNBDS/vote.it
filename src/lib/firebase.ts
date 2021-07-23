import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyCwZBGS_DAdvkHh5tvooE6XXgC5xc5hW54',
  authDomain: 'voteit-45550.firebaseapp.com',
  projectId: 'voteit-45550',
  storageBucket: 'voteit-45550.appspot.com',
  messagingSenderId: '865827562467',
  appId: '1:865827562467:web:e97352789c88016cec36d6',
  measurementId: 'G-EV18GR57LB',
};

try {
  firebase.initializeApp(firebaseConfig);
} catch (err) {
  if (!/already exists/.test(err.message)) {
    // eslint-disable-next-line no-console
    console.error('Firebase initialization error', err.stack);
  }
}

const fire = firebase;

export default fire;

const { analytics } = fire;
const db = fire.firestore();
const cdn = fire.storage().ref();

export { analytics, db, cdn, firebaseConfig };
