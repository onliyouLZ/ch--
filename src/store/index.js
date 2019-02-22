import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios/index";

Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    user: {

    },
  },
  mutations: {
    LoginByUser(state, value){
      this.state.user=value;
      localStorage.setItem("roleId",value.roleId);
      localStorage.setItem("userName",value.name);
    }
  },
});


export default store

