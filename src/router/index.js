import Vue from "vue";
import VueRouter from "vue-router"; //路由
import store from "../store/store";
import admin from "./admin"; //导入路由文件
import home from "./home"; //g前端页面路由
import {
  powerRouter
} from "./admin";
Vue.use(VueRouter);
//合并两个路由
let routes = new Set([...home, ...admin]);

if (sessionStorage.getItem("token")) {
  store.commit("set_token", sessionStorage.getItem("token"));
}

const router = new VueRouter({
  routes
  //mode: 'history'
});

router.beforeEach((to, from, next) => {
  if (store.getters.role) {
    //判断角色是否存在
    if (store.getters.newrouter.length !== 0) {
      next();
    } else {
      let newrouter;
      if (store.getters.role == "Super") {
        newrouter = powerRouter;
      } else {
        let newchildren = powerRouter[0].children.filter(route => {
          if (route.meta) {
            if (route.meta.role == store.getters.role) {
              return true;
            }
            return false;
          } else {
            return true;
          }
        });
        newrouter = powerRouter;
        newrouter[0].children = newchildren;
      }
      router.addRoutes(newrouter); //添加动态路由
      store.dispatch("Roles", newrouter).then(res => {
          next({ ...to
          });
        })
        .catch(() => {});
    }
  } else {
    if (['/admin'].indexOf(to.path) !== -1) {
      next()
    } else {
      next('/admin');
    }
  }
});

export default router;
