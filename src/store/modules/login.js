import axios from 'axios'
import crypto from '../../../tools/crypto.js';
import store from '../store.js';
const login = {

  mutations: {
    set_token: (state, token) => {
      store.state.token = token
      sessionStorage.token = token
    },
    del_token: (state) => {
      store.state.token = ''
      sessionStorage.removeItem('token')
    },
    set_admin: (state, name) => {
      store.state.name = name
      sessionStorage.name = name
    },
    set_role: (state, role) => {
      store.state.role = role
      sessionStorage.role = role
    },
    set_newrouter(state, newrouter) {
      store.state.newrouter = newrouter
    },
    set_mangerlist(state, mangerlist) {
      store.state.mangerlist = mangerlist
      sessionStorage.mangerlist = mangerlist
    }

  },
  actions: {
    AdminLogin({
      commit
    }, info) {
      return axios
        .post("api/admin/getAdminer", {
          name: info.name,
          passwd: crypto(info.passwd)
        })
        .then(res => {
          if (res.data.resultCode === 200) {
            let data = res.data;
            //根据store中set_token方法将token保存至localStorage/sessionStorage中，data["Authentication-Token"]，获取token的value值
            // console.log(data);
            commit('set_token', data["token"]);
            commit("set_admin", info.name);
            commit("set_role", res.data.info[0].role);
            return res.data.info[0].role;
          }
        }).catch(error => {
          console.log(error);

        });

    },
    Roles({ //生成新路由
      commit
    }, newrouter) {
      // return new Promise((resolve, reject) => {
      commit('set_newrouter', newrouter); //存储最新路由
      //   resolve(newrouter);
      // }).catch(error => {
      //   reject(error);
      // });

    },
    LoginOut({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        commit('del_token', '');
        commit('set_name', '');
        commit('set_role', '');
        commit('set_newrouter', []);
        location.reload();
        sessionStorage.removeItem('name');
        sessionStorage.removeItem('role');
        resolve();
      }).catch(error => {
        reject(error);
      });
    }

  }
}
export default login;
