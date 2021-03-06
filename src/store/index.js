import Vue from "vue";
import Vuex from "vuex";
import userModule from "./user";
import foodModule from "./food";
import trainingModule from "./training";
import dietsModule from "./diets";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user: userModule,
    food: foodModule,
    training: trainingModule,
    diets: dietsModule
  }
});
