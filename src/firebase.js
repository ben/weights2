import firebase from 'firebase'
const config = {
  apiKey: "AIzaSyD7bIYShL1QVwFCl8gNUnX05FpLxjirk4A",
  authDomain: "weights-1a178.firebaseapp.com",
  databaseURL: "https://weights-1a178.firebaseio.com",
  projectId: "weights-1a178",
  storageBucket: "weights-1a178.appspot.com",
  messagingSenderId: "222387091855"
};
firebase.initializeApp(config)
export { firebase }

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
