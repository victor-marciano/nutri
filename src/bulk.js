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
  name: "Treino ABCDE (Avançado)",
  objective: "Hipertrofia",
  genero: "Masculino",
  start: null,
  finish: null,
  trainings: [
    {
      weekDay: "Segunda Feira",
      exercises: [
        { name: "Supino Reto", series: "4x6" },
        { name: "Supino Inclinado", series: "4x6" },
        { name: "Supino Declinado", series: "Até a falha" },
        { name: "Crossover", series: "4x8" },
        { name: "Crucifixo Reto", series: "4x6" }
      ]
    },
    {
      weekDay: "Terça Feira",
      exercises: [
        { name: "Barra Fixa", series: "4x8" },
        { name: "Remada Curvada", series: "4x8" },
        { name: "Remada Sentada", series: "4x10" },
        { name: "Pullover", series: "4x10" },
        { name: "Levantamento Terra", series: "4x10" }
      ]
    },
    {
      weekDay: "Quarta Feira",
      exercises: [
        { name: "Agachamento Livre", series: "4x6" },
        { name: "Leg Press", series: "4x6" },
        { name: "Stiff", series: "Até a falha" },
        { name: "Extensora", series: "4x8" },
        { name: "Flexora", series: "4x6" }
      ]
    },
    {
      weekDay: "Quinta Feira",
      exercises: [
        { name: "Desenvolvimento Sentado", series: "4x8" },
        { name: "Desenvolvimento Arnold", series: "4x8" },
        { name: "Elevação Lateral", series: "4x10" },
        { name: "Encolhimento Barra", series: "4x10" },
        { name: "Encolhimento com haltéres", series: "4x10" }
      ]
    },
    {
      weekDay: "Sexta Feira",
      exercises: [
        { name: "Paralelas", series: "4x8" },
        { name: "Tríceps Francês", series: "4x8" },
        { name: "Tríceps Pulley", series: "4x10" },
        { name: "Rosca Direta", series: "4x10" },
        { name: "Rosca Concentrada", series: "4x10" },
        { name: "Rosca Martelo", series: "4x10" }
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
