import axios from 'axios'
import store from '../store.js';
const symptom = {

  mutations: {
    set_symlist: (state, symlist) => {
      store.state.symlist = symlist
    },
  },
  actions: {
    getSymlist({ //获取症状
      commit
    }) {
      axios.get("/api/symptom/getSymptom").then(res => {
        //   console.log(res);
        if (res.status == 200) {
          commit('set_symlist', res.data);
        }
      });
    },
    updateSym({ //修改症状
      commit
    }, data) {
      axios
        .post("/api/symptom/updateSym", {
          id: data.id,
          name: data.name,
          remark: data.remark
        })
        .then(res => {
          // console.log(res);
        }).catch(error => {
          console.log(error);
        })
    },
    delSym({ //删除药材
      commit
    }, data) {
      axios
        .post("/api/symptom/delSym", {
          id: data
        })
    }

  }
}
export default symptom;
