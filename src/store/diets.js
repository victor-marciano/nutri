import { db } from "../firebase";

const dietModule = {
  state: {
    diets: null
  },

  mutations: {
    SET_DIETS(state, diet) {
      state.diets = diet;
    }
  },

  actions: {
    fetchDiets: async ({ commit }) => {
      try {
        const diets = [];
        const diet = await db.collection("diets").get();
        diet.forEach(diet => {
          let dietData = diet.data();
          diets.push(dietData);
        });
        commit("SET_DIETS", diets);
      } catch (error) {
        console.log(error);
      }
    }
  },

  getters: {
    diets: state => state.diets
  }
};

export default dietModule;