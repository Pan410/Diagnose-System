<template>
<!-- 顶部导航 -->
    <div class="HeadNav">
        <!-- logo -->
        <div class="logo">
             <h3 >中医技术站</h3>
        </div>
        <!-- 顶部栏各种信息 -->
         <div class="HeadContent">
            <el-button type="primary"  plain disabled>{{role}}</el-button>
         <el-dropdown  @command="handleCommand">
             <span class="el-dropdown-link"> 
               {{name}}
               <i class="el-icon-arrow-down el-icon--right"></i>
             </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="personal" >个人中心</el-dropdown-item>
              <el-dropdown-item command="loginOut" >退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown> 
        </div>      
    </div>
</template>
<script>
import store from "../store/store.js";
import { mapGetters } from "vuex";
export default {
  data: function() {
    return {};
  },
  computed: {
    ...mapGetters(["name"]),
    ...mapGetters(["role"])
  },

  methods: {
    handleCommand(command) {
      if (command == "loginOut") {
        this.$store
          .dispatch("LoginOut")
          .then(() => {
            this.$router.push("/admin");
            this.$message.success("退出成功");
          })
          .catch(err => {
            this.$message.error("退出失败");
          });
      }
      if (command == "personal") {
        this.$router.push("/personal");
      }
    }
  }
};
</script>
<style lang="less" scoped>
.HeadNav {
  // position: fixed;
  width: 100%;
  background-color: #409eff;
  height: 60px;
  .logo {
    padding-left: 30px;
    float: left;
  }
  .HeadContent {
    float: right;
    padding-right: 30px;
    line-height: 60px;
    .el-button {
      margin-right: 30px;
    }
  }
}
</style>
