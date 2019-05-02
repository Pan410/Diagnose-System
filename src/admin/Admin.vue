<template>
  <div class="admin">
    <div class="admin-con">
      <h3>管理员登录中心</h3>
      <div style="margin: 20px;"></div>
      <el-form  label-width="80px" :model="loginFrom">
        <el-form-item label="用户名">
          <el-input v-model="loginFrom.name"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="loginFrom.passwd"></el-input>
        </el-form-item> 
      </el-form>
      <el-button type="primary" @click="submitForm(loginFrom)">立即登录</el-button>
      </div>
  </div>
</template>
 
<script>
import crypto from "../../tools/crypto.js";
import store from "../store/store.js";

export default {
  data() {
    return {
      loginFrom: {
        name: "",
        passwd: ""
      }
    };
  },
  methods: {
    submitForm(data) {
      // console.log(data);
      this.$store
        .dispatch("AdminLogin", data)
        .then(res => {
          // console.log(res);
          this.$router.push({ path: "/" });
          this.$message.success("登录成功");
        })
        .catch(error => {
          console.log(error);
          this.$message.error("账号或密码错误");
        });
    }
  }
};
</script>
<style lang="less" scoped>
.admin {
  width: 100%;
  height: 600px;
  .admin-con {
    margin-left: 60%;
    margin-top: 10%;
    padding: 30px 30px;
    width: 30%;
    border: 1px #409eff solid;
  }
}
</style>
 
