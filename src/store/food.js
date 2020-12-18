import { db } from "../firebase";

const foodModule = {
  state: {
    foods: null
  },

  mutations: {
    SET_FOOD(state, food) {
      state.foods = food;
    }
  },

  actions: {
    fetchFood: async ({ commit }) => {
      try {
        const foods = [];
        const food = await db.collection("foods").get();
        food.forEach(food => {
          let foodData = food.data();
          for (var key in foodData) {
            if (key != "name") {
              foodData[key] = Math.round(foodData[key]);
            }
          }
          foods.push(foodData);
        });
        commit("SET_FOOD", foods);
      } catch (error) {
        console.log(error);
      }
    }
  },

  getters: {
    foods: state => state.foods
  }
};

export default foodModule;
