// import { db } from './firebase'
const firebase = require("firebase");
require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyA8XqYWvYe6ZrXOOtJmNPTub46E_wOJHHg",
  authDomain: "nutrimars.firebaseapp.com",
  databaseURL: "https://nutrimars.firebaseio.com",
  projectId: "nutrimars",
  storageBucket: "nutrimars.appspot.com",
  messagingSenderId: "932185209293",
  appId: "1:932185209293:web:e37c1839d98c8d019bec84"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const diets = 
  { name: 'Dieta Emagrecimento', start: null, end: null, meals: [
    { name: '', hour: '', foods: [
      { id: '11eZpNDmvTgUcIZ8hpCJ', qtd: 80},
      { id: 'wQriQTgGQTYqBR8dnja8', qtd: 100},
      { id: 'qdMVUbPd7FXbXUTlRcWW', qtd: 70},
    ]},
    { name: '', hour: '', foods: [
      { id: '11eZpNDmvTgUcIZ8hpCJ', qtd: 80},
      { id: 'wQriQTgGQTYqBR8dnja8', qtd: 100},
      { id: 'qdMVUbPd7FXbXUTlRcWW', qtd: 70},
    ]},
    { name: '', hour: '', foods: [
      { id: '11eZpNDmvTgUcIZ8hpCJ', qtd: 80},
      { id: 'wQriQTgGQTYqBR8dnja8', qtd: 100},
      { id: 'qdMVUbPd7FXbXUTlRcWW', qtd: 70},
    ]},
  ]}

db.collection("diets")
.add(diets)
.then(docRef => {
  console.log(docRef.id);
})
.catch(err => {
  console.log(err);
});
