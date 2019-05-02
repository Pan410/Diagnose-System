import axios from 'axios'
import crypto from '../../../tools/crypto.js';
import store from '../store.js';
const manger = {

  mutations: {
    set_tableData(state, tableData) {
      store.state.tableData = tableData
    }

  },
  actions: {
    getAdmin({
      commit
    }) {
      return axios.get("/api/admin/getAdmin", {}).then(res => {
          if (res.status == 200) {
            commit('set_tableData', res.data)
            // console.log(res);
          } else {
            this.$message.error("获取失败");
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    addAdmin({
      commit
    }, data) {
      return axios
        .post("/api/admin/addAdmin", {
          // date: date,
          name: data.name,
          passwd: data.passwd,
          role: data.role,
          //   date: date
        })
        .then(res => {
          // console.log(res);

        })
        .catch(error => {
          //   this.$message.error("添加失败");
          console.log(error);
        });
    }

  }
}
export default manger;
