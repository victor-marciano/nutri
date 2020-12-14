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
  getters: {
    user: state => state.authUser
  },
};

export default userModule;
