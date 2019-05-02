import axios from 'axios'
import store from '../store.js';
const record = {

  mutations: {
    set_everycealist: (state, everycealist) => {
      store.state.everycealist = everycealist
    },
    set_mycrealist: (state, mycrealist) => {
      store.state.mycrealist = mycrealist
    }
  },
  actions: {
    getEverycealist({
      commit
    }) {
      axios.get("/api/recordApi/everCreation").then(res => {
        if (res.status == 200) {
          // console.log(res);
          commit('set_everycealist', res.data);
        } else {
          this.$message.error("获取失败");
        }
      }).catch(err => {
        console.log(err);
      });
    },
    getMycrealist({
      commit
    }, data) {
      axios.post("/api/recordApi/myCreation", {
        auther: data
      }).then(res => {
        if (res.status == 200) {
          // console.log(res);
          commit('set_mycrealist', res.data);
        } else {
          this.$message.error("获取失败");
        }
      }).catch(err => {
        console.log(err);
      });
    }



  }
}

export default record;
