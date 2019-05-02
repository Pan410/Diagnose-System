<template>
  <div class="Sheet">
    <el-col :span="24" class="colligate">
        <!-- 顶部导航栏 -->
      <HeadNav></HeadNav>
      <el-col class="leftNav" :span="3">
        <!-- 左侧导航栏 -->
        <el-menu mode="vertical"  theme="dark" class="el-menu-vertical-demo" :default-active="$route.path" >
          <el-menu  v-for ="item in newrouter[0].children" :key="item.name" v-if="!item.hidden" :collapse="isCollapse" > 
            <!-- 二级路由 -->
            <el-submenu :index="item.name" v-if="!item.hidden&&item.children">
              <template slot="title">
                <i :class="item.icon"></i>
                <span slot="title">{{item.name}}</span>
              </template>
              <router-link v-for="subroute in item.children" :key="subroute.name" :to="subroute.path">
                <el-menu-item :index="subroute.path" @click="routeNav(subroute.name,subroute.path)">{{subroute.name}}</el-menu-item>
              </router-link>
            </el-submenu>
            <!-- 一级路由 -->
            <router-link :to="item.path" :index="item.name">
              <el-menu-item :index="item.path" v-if="!item.hidden&&!item.children" @click="routeNav(item.name,item.path)">
                  <i :class="item.icon"></i>
                  <span slot="title">{{item.name}}</span>
              </el-menu-item>
            </router-link>
          </el-menu>
        </el-menu>   
      </el-col>  
      <!-- 渲染内容 -->
       <el-col class="render" :span="21">
          <div class="line">
            <!-- 返回顶部 -->
            <Totop></Totop> 
            <!-- 路由导航 -->
            <Bread></Bread>
            <router-view></router-view>
          </div>
       </el-col>
      </el-col>
    
    </div>
</template>
<script>
import Totop from "./Totop.vue";
import Bread from "./Bread.vue";
import HeadNav from "./HeadNav";
import store from "../store/store.js";
import { mapGetters } from "vuex";
export default {
  data: function() {
    return {
      currentTopMenu: "1",
      isCollapse: false,
      routey: [
        {
          // name: "",
          // path: ""
        }
      ]
    };
  },
  computed: {
    ...mapGetters(["newrouter"]),
    ...mapGetters(["routenav"])
  },
  components: {
    HeadNav,
    Bread,
    Totop
  },
  methods: {
    routeNav(data, path) {
      //生成导航路由
      if (JSON.stringify(this.routey).indexOf(JSON.stringify(data)) == -1) {
        this.routey.push({ name: data, path: path });
        this.$store.dispatch("AddrouteNav", this.routey);
        // console.log(this.routenav);
      }
    }
  }
};
</script>
<style lang="less" scoped>
.login {
  float: right;
}
a {
  text-decoration: none;
}
.colligate {
  position: relative;
  .HeadNav {
    //顶部导航
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
  }
  .leftNav {
    //左侧导航
    position: fixed;
    top: 60px;
    left: 0;
    z-index: 99;
  }
  .Totop {
    //返回顶部
    position: fixed;
    right: 100px;
    bottom: 100px;
    z-index: 99;
  }
  .Bread {
    //路由导航
    position: fixed;
    top: 60px;
    left: 12.5%;
    z-index: 99;
  }
  .render {
    //渲染页面
    margin-top: 130px;
    margin-left: 210px;
    // background-color: pink;
  }
}
</style>
