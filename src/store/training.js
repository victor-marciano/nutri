import { db, auth } from "../firebase";
import moment from "../date";

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
    exercises: state => state.exercises,
    userTrainings: (state, getters) => {
      let userTrainings = getters.trainings.filter(
        training => training.userId === auth.currentUser.uid
        );
        return userTrainings;
      },
    activeTraining: (state, getters) => {
      let activeTraining = getters.userTrainings.find(training => training.active);
      if (activeTraining) {
        activeTraining = Object.assign(activeTraining, {
          remaining: moment(activeTraining.finish).fromNow()
        });
      }
      return activeTraining;
    },
    systemTrainings: (state, getters) => {
      let systemTrainings = getters.trainings.filter(
        training => training.system
      );
      return systemTrainings;
    }
  }
};

export default trainingModule;
