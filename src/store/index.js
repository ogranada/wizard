import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    showOverlay: false,
    userInfo: null,
    currentStep: 0,
    firstName: "",
    lastName: "",
    ghUser: "",
    email: "",
    t_and_c: false
  },
  mutations: {
    currentStep(store, step) {
      store.currentStep = step;
    },
    firstName(store, firstname) {
      store.firstName = firstname;
    },
    lastName(store, lastname) {
      store.lastName = lastname;
    },
    githubUser(store, ghUser) {
      store.ghUser = ghUser;
    },
    email(store, email) {
      store.email = email;
    },
    t_and_c(store, t_and_c) {
      store.t_and_c = t_and_c;
    },
    showOverlay(store) {
      store.showOverlay = true;
    },
    hideOverlay(store) {
      store.showOverlay = false;
    },
    userInfo(store, userInfo) {
      store.userInfo = userInfo;
      store.showOverlay = Object.keys(userInfo).length > 0;
    }
  },
  actions: {},
  modules: {}
});
