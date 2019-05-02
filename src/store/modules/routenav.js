import axios from 'axios'
import store from '../store.js';
const routernav = {

  mutations: {
    set_routenav: (state, routenav) => {
      store.state.routenav = routenav
    }
  },
  actions: {
    AddrouteNav({
      commit
    }, info) {
      commit('set_routenav', info); //存储最新路由 
    }

  }
}
export default routernav;
