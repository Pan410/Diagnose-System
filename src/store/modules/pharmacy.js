import axios from 'axios'
import store from '../store.js';
const pharmacy = {

  mutations: {
    set_phalist: (state, phalist) => {
      store.state.phalist = phalist
    },
  },
  actions: {
    getPhaList({ //获取药材
      commit
    }) {
      axios
        .get("/api/pharmacy/getPharmacy")
        .then(res => {
          // console.log(res);
          if (res.status == 200) {
            commit('set_phalist', res.data);
          } else {
            this.$message.error("获取失败");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    updatePha({ //修改药材
      commit
    }, data) {
      axios
        .post("/api/pharmacy/updatePha", {
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
    delPha({ //删除药材
      commit
    }, data) {
      axios
        .post("/api/pharmacy/delPha", {
          id: data
        })
    }

  }
}
export default pharmacy;
