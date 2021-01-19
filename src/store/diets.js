import { db, auth } from "../firebase";
import moment from "../date";

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
          dietData = Object.assign(dietData, { uid: diet.id });
          diets.push(dietData);
        });
        commit("SET_DIETS", diets);
      } catch (error) {
        console.log(error);
      }
    }
  },

  getters: {
    diets: state => state.diets,
    activeDiet: (state, getters) => {
      let activeDiet = getters.diets
        ? getters.diets.find(diet => diet.active)
        : false;
      if (activeDiet) {
        activeDiet = Object.assign(activeDiet, {
          remaining: moment(activeDiet.finish).fromNow()
        });
      }
      return activeDiet;
    },
    userDiets: (state, getters) => {
      if (getters.diets) {
        let userDiets = getters.diets.filter(
          diet => diet.userId === auth.currentUser.uid
        );

        return userDiets;
      }
    },
    systemDiets: (state, getters) => {
      let systemDiets = getters.diets
        ? getters.diets.filter(diet => diet.system)
        : false;
      return systemDiets;
    }
  }
};

export default dietModule;
