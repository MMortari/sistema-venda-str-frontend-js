import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyDneBsodDnsKZI8C_Tpfiel2H719nyYWVg",
  authDomain: "sistema-venda-str-backend.firebaseapp.com",
  databaseURL: "https://sistema-venda-str-backend.firebaseio.com",
  projectId: "sistema-venda-str-backend",
  storageBucket: "sistema-venda-str-backend.appspot.com",
  messagingSenderId: "839545200930",
  appId: "1:839545200930:web:f121c9f1cedb68aa"
};

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

export const firebaseImpl = initial;
export const firebaseFirestore = firestore;
export const firebaseDatabase = firebase.database();