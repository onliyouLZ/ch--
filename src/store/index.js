import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    loginForm: {
      username: '',
      password: ''
    },
  },
  mutations: {
    LoginByUsername(state, value){
      this.state.loginForm=value;
    }
  },
});


export default store

