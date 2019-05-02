import axios from 'axios'
import store from '../store.js';
const consilia = {

  mutations: {
    set_conlist: (state, conlist) => {
      store.state.Conlist = conlist
    },
  },
  actions: {
    getConsilia({ //获取患者
      commit
    }) {
      axios.get("/api/consilia/getConsilia").then(res => {
        // console.log(res);
        if (res.status == 200) {
          commit('set_conlist', res.data);
        }
      });
    },
    updateConsilia({ //修改患者
      commit
    }, data) {
      axios
        .post("/api/consilia/updateConsilia", {
          id: data.id,
          name: data.name,
          date: data.date,
          sym: data.sym,
          pres: data.pres,
          diag: data.diag,
          remark: data.remark
        })
        .then(res => {
          // console.log(res);
        }).catch(error => {
          console.log(error);
        })
    },
    delCon({ //删除患者
      commit
    }, data) {
      axios
        .post("/api/consilia/delConsilia", {
          id: data
        })
    }

  }
}
export default consilia;
