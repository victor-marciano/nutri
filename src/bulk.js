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

// const diets = {
//   name: "Dieta Emagrecimento",
//   start: null,
//   end: null,
//   system: true,
//   meals: [
//     {
//       name: "",
//       hour: "",
//       foods: [
//         { id: "11eZpNDmvTgUcIZ8hpCJ", qtd: 80 },
//         { id: "wQriQTgGQTYqBR8dnja8", qtd: 100 },
//         { id: "qdMVUbPd7FXbXUTlRcWW", qtd: 70 }
//       ]
//     },
//     {
//       name: "",
//       hour: "",
//       foods: [
//         { id: "11eZpNDmvTgUcIZ8hpCJ", qtd: 80 },
//         { id: "wQriQTgGQTYqBR8dnja8", qtd: 100 },
//         { id: "qdMVUbPd7FXbXUTlRcWW", qtd: 70 }
//       ]
//     },
//     {
//       name: "",
//       hour: "",
//       foods: [
//         { id: "11eZpNDmvTgUcIZ8hpCJ", qtd: 80 },
//         { id: "wQriQTgGQTYqBR8dnja8", qtd: 100 },
//         { id: "qdMVUbPd7FXbXUTlRcWW", qtd: 70 }
//       ]
//     }
//   ]
// };

// db.collection("diets")
//   .add(diets)
//   .then(docRef => {
//     console.log(docRef.id);
//   })
//   .catch(err => {
//     console.log(err);
//   });

const training = {
  name: "Treino Feminino Iniciante",
  objective: "Hipertrofia",
  genero: "Feminino",
  start: null,
  finish: null,
  system: true,
  trainings: [
    {
      weekDay: "Segunda Feira",
      exercises: [
        { name: "Agachamento Livre", series: "3x10" },
        { name: "Stiff", series: "4x6" },
        { name: "Passada", series: "Até a falha" },
        { name: "Flexora", series: "4x8" },
        { name: "Extensora", series: "4x6" },
        { name: "Ponte com Barra", series: "4x6" }
      ]
    },
    {
      weekDay: "Quarta Feira",
      exercises: [
        { name: "Supino Reto Máquina", series: "4x8" },
        { name: "Pulldown", series: "4x8" },
        { name: "Desenvolvimento Haltéres", series: "4x10" },
        { name: "Elevação Lateral", series: "4x10" },
        { name: "Tríceps Corda", series: "4x10" },
        { name: "Rosca Alternada", series: "4x10" },
        { name: "Panturrilha no Leg Press", series: "4x10" }
      ]
    },
    {
      weekDay: "Sexta Feira",
      exercises: [
        { name: "Agachamento Livre", series: "3x10" },
        { name: "Stiff", series: "4x6" },
        { name: "Passada", series: "Até a falha" },
        { name: "Flexora", series: "4x8" },
        { name: "Extensora", series: "4x6" },
        { name: "Ponte com Barra", series: "4x6" }
      ]
    }
  ]
};

db.collection("trainings")
  .add(training)
  .then(docRef => {
    console.log(docRef.id);
  })
  .catch(err => {
    console.log(err);
  });
