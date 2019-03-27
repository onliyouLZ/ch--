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
      // localStorage.setItem("roleId",value.roleId);
      localStorage.setItem("roleId",1);
      // localStorage.setItem("userName",value.name);
      localStorage.setItem("userName","admin");
    }
  },
});


export default store

