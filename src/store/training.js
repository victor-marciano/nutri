import { db } from "../firebase";

const trainingModule = {
  state: {
    trainings: [],
    exercises: []
  },

  mutations: {
    SET_TRAININGS(state, trainings) {
      state.trainings = trainings;
    },
    SET_EXERCISES(state, exercises) {
      state.exercises = exercises;
    }
  },

  actions: {
    fetchTrainings: async ({ commit }) => {
      try {
        const trainings = [];
        const response = await db.collection("trainings").get();
        response.forEach(training => {
          let trainingData = training.data();
          trainingData = Object.assign(trainingData, { uid: training.id });
          trainings.push(trainingData);
        });
        commit("SET_TRAININGS", trainings);
      } catch (error) {
        console.log(error);
      }
    },

    fetchExercises: async ({ commit }) => {
      try {
        const exercises = [];
        const response = await db.collection("exercises").get();
        response.forEach(exercise => {
          let exerciseData = exercise.data();
          exercises.push(exerciseData);
        });
        commit("SET_EXERCISES", exercises);
      } catch (error) {
        console.log(error);
      }
    }
  },

  getters: {
    trainings: state => state.trainings,
    exercises: state => state.exercises
  }
};

export default trainingModule;
