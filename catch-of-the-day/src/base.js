import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: 'AIzaSyAzOiUvYaeehPLyU8r7cZeTiRLPDsA4AAg',
    authDomain: 'catch-of-the-day-joel-67d30.firebaseapp.com',
    databaseURL: 'https://catch-of-the-day-joel-67d30.firebaseio.com'
});

const base = Rebase.createClass(firebaseApp.database());

// This is a named export
export { firebaseApp };

// This is a default export
export default base;
