import axios from 'axios'
import store from '../store.js';
const sick = {

  mutations: {
    set_sicklist: (state, sicklist) => {
      store.state.sicklists = sicklist
    },
    set_userSicklist: (state, userSicklist) => {
      store.state.userSicklist = userSicklist
    }
  },
  actions: {
    addSick({
      commit
    }, info) {
      return axios
        .post("/api/sick/addSick", {
          id: info.id,
          name: info.name,
          sex: info.sex,
          age: info.age,
          date: info.date,
          card: info.card,
          iphone: info.iphone,
          history: info.history,
          place: info.place
        })
    },
    getSick({
      commit
    }) {
      axios.get("/api/sick/getSick", {

      }).then(res => {
        if (res.status == 200) {
          commit('set_sicklist', res.data);
        }
      })
    },
    getUserSick({
      commit
    }, info) {
      axios.post("/api/sick/getUserSick", {
        num: info.num,
        id: info.id,
        name: info.name,
        card: info.card,
        iphone: info.iphone,
      }).then(res => {
        if (res.status == 200) {
          commit("set_userSicklist", res.data);
          // console.log(res.data);
        }
      })
    }



  }
}

export default sick;
