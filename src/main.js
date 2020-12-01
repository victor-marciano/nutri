import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { auth } from "./firebase";

Vue.config.productionTip = false;

auth.onAuthStateChanged((user) => {
  if (user) {
    store.commit("SET_AUTH_USER", user);
  } else {
    store.commit("SET_AUTH_USER", null);
  }

  new Vue({
    router,
    store,
    vuetify,
    render: (h) => h(App),
  }).$mount("#app");
});
