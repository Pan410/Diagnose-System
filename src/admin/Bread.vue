<template>
    <div class="Bread">
        <!-- 面包屑 -->
       <!-- <span class="el-icon-caret-left"></span> -->
        <el-breadcrumb class="breadcrumb"  separator=" ">
            <el-breadcrumb-item v-for="(item, index) in routenav"  v-if="index"  :key="index" :to="{ path: item.path }">
                <el-tag closable  @close="handleClose(index)" :class=" navIndex === index ? 'item-cn item-cn-active' : 'item-cn'">{{item.name}}</el-tag>
            </el-breadcrumb-item>
        </el-breadcrumb>    
    </div>
</template>
<script>
import store from "../store/store.js";
import { mapGetters } from "vuex";
export default {
  data: function() {
    return {
      navIndex: ""
    };
  },
  computed: {
    ...mapGetters(["routenav"])
  },
  watch: {
    $route() {
      // 获取当前路径
      let path = this.$route.path;
      // console.log(path);
      // 检索当前路径
      this.checkRouterLocal(path);
    }
  },
  methods: {
    handleClose(index) {
      //关闭某个路由导航
      this.routenav.splice(index, 1);
      // console.log(this.routenav);
    },
    checkRouterLocal(path) {
      this.navIndex = this.routenav.findIndex(item => item.path === path);
      // console.log(this.navIndex);
    }
  }
};
</script>
<style  lang="less" scoped>
.Bread {
  width: 100%;
  // background-color: pink;
  .breadcrumb {
    // height: 50px;
    line-height: 30px;
    .el-tag {
      cursor: pointer;
    }
  }
  .item-cn-active {
    color: #fff;
    background-color: #409eff;
  }
}
</style>