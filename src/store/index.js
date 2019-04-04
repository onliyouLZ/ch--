import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios/index";

Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    user: {

    },
    router:""
  },
  mutations: {
    LoginByUser(state, value){
      this.state.user=value;
      localStorage.setItem("roleId",value.roleId);
      localStorage.setItem("userName",value.name);
    },
    getMenu(){
      let id=localStorage.getItem('roleId');
      if(id){
        axios.get('http://localhost:3000/menus?roleId='+id).then(res=>{
          if(res.status===200){
            console.log(res);
            localStorage.setItem('menu',JSON.stringify(res.data));
          }
        })
      }
    },
    ADD_ROUTERS(state,addRouters){
      state.router = addRouters
    }
  },
});


export default store

