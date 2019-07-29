import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';

const config = {};

const initial = firebase.initializeApp(config);
const firestore = firebase.firestore();

// console.log("Firebase -> ", initial);
// console.log("Firestore -> ", firestore);
// firestore.collection('produtos').get().then((snapshot) => {
//   console.log("snapshot -> ", snapshot)
//   snapshot.forEach((doc) => {
//     console.log(doc.id, '=>', doc.data());
//   });
// })
// console.log("Firestore -> ", );

export const app = initial;
export const firebaseFirestore = firestore;
export const firebaseDatabase = firebase.database();