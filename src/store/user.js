const userModule = {
  state: {
    authUser: {},
    userData: {},
  },

  mutations: {
    SET_AUTH_USER(state, user) {
      state.authUser = user;
    },
  },
  actions: {},
  getters: {},
};

export default userModule;
