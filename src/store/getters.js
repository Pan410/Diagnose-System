const getters = {
  name: state => state.name, //管理员姓名
  role: state => state.role, //管理员角色
  token: state => state.token, //管理员密钥
  manger: state => state.manger, //添加管理员列表
  tableData: state => state.tableData, //获取管理员列表
  updatemanger: state => state.updatemanger, //修改管理员列表
  mangerlist: state => state.mangerlist, //当前管理员用户信息
  newrouter: state => state.newrouter, //生成的路由
  routenav: state => state.routenav, //路由导航列表
  phalist: state => state.phalist, //获取药材列表
  Alterpha: state => state.Alterpha, //修改药材列表
  symlist: state => state.symlist, //获取症状数组
  altersym: state => state.altersym, //修改症状数组
  Conlist: state => state.Conlist, //医案列表
  updateCon: state => state.updateCon, //修改医案列表
  everycealist: state => state.everycealist, //所有可浏览创作列表
  mycrealist: state => state.mycrealist, //本人创作列表
  updateCreation: state => state.updateCreation, //修改创作列表
  personallist: state => state.personallist, //个人中心内容
  sicklists: state => state.sicklists, //患者用户表
  userSicklist: state => state.userSicklist, //查找出的老用户

};
export default getters;
