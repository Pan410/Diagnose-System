//SQL语句
var sqlMap = {
  // 管理员
  admin: {
    gets: 'SELECT * FROM admin WHERE name=? and passwd=?', //管理员登录状态
    get: 'SELECT * FROM admin', //获取全部管理员
    add: 'INSERT INTO admin (date,name,passwd,role) VALUES(?,?,?,?)', //增加管理员
    del: 'DELETE FROM admin WHERE id=?', //删除管理员
    update: 'UPDATE admin SET name=?,passwd=?,role=? WHERE id=?', //修改管理员信息
  },
  // 症状栏
  symptom: {
    add: 'INSERT INTO symptom (name, remark) VALUES(?,?)', //增加症状
    get: 'SELECT * FROM symptom', //获取症状
    del: 'DELETE FROM symptom WHERE id=?', //删除症状
    update: 'UPDATE symptom SET name=?,remark=? WHERE id=?', //修改症状
    sel: 'SELECT * FROM symptom WHERE name=?'

  },
  // 增加药材
  pharmacy: {
    add: 'INSERT INTO pharmacy (name, remark) VALUES(?,?)', //增加药材
    get: 'SELECT * FROM pharmacy', //获取药材
    del: 'DELETE FROM pharmacy WHERE id=?', //删除药材
    update: 'UPDATE pharmacy SET name=?,remark=? WHERE id=?', //修改药材
    sel: 'SELECT * FROM pharmacy WHERE name=?'
  },
  // 增加医案
  consilia: {
    add: 'INSERT INTO consilia (uid, sym, diag,date,name) VALUES(?,?,?,?,?)',
    get: 'SELECT * FROM consilia', //获取医案
    update: 'UPDATE consilia SET name=?,date=?,sym=?,diag=?,pres=?,remark=? WHERE id=?', //修改医案信息
    del: 'DELETE FROM consilia WHERE id=?', //删除医案
  },
  record: {
    add: 'INSERT INTO record (title, auther,date, content,look) VALUES( ? , ? , ? , ? , ? ) ', //增加创作
    get: 'SELECT * FROM record', //获取创作
    getevery: 'SELECT * FROM record WHERE look=1', //获取所有可浏览著作
    getmy: 'SELECT * FROM record WHERE auther=?'
  },
  sick: {
    add: 'INSERT INTO sick (id,name,sex,age,date,card,iphone,history,place) VALUES(?, ? , ? , ? , ? ,?, ? ,?,?)', //患者信息
    get: 'SELECT * FROM sick',
  },
  bayes: { //贝叶斯
    addsym: 'INSERT INTO data (uid,sid) VALUES(?,?)', //添加患者症状测试
    getPhy: 'SELECT * FROM result WHERE uid=?', //获取该患者推荐的药材
  },
  Home: {
    add: 'INSERT INTO test (id, sym, diag) VALUES(?,?,?)',

  }
}

module.exports = sqlMap;
