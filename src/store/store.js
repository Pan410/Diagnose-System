import Vue from 'vue'
import Vuex from 'vuex'
import login from './modules/login'
import manger from './modules/manger'
import routenav from './modules/routenav'
import pharmacy from './modules/pharmacy'
import symptom from './modules/symptom'
import consilia from './modules/consilia'
import record from './modules/record'
import sick from './modules/sick'
import getters from './getters'


Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    token: sessionStorage.getItem('token'), //密钥
    name: sessionStorage.getItem('name'), //管理员姓名
    role: sessionStorage.getItem('role'), //管理员角色
    manger: [], //添加管理员列表
    tableData: [], //获取管理员列表
    updatemanger: [], //修改管理员列表
    newrouter: [], //路由列表
    routenav: [], //路由导航列表
    phalist: [], //获取药材列表
    Alterpha: [], //修改药材列表
    symlist: [], //获取症状列表
    altersym: [], //修改症状列表
    Conlist: [], //医案列表
    updateCon: [], //修改医案列表
    everycealist: [], //所有可浏览创作列表
    mycrealist: [], //本人创作列表
    updateCreation: [], //修改创作列表
    personallist: [], //个人中心内容
    sicklists: [], //所有患者用户表
    userSicklist: [], //查找出的老用户
  },
  modules: {
    login, //登录 
    manger, //管理员
    routenav, //路由导航
    pharmacy, //药材
    symptom, //症状
    consilia, //医案
    record, //创作
    sick, //患者
  },
  getters,

});
export default store;
