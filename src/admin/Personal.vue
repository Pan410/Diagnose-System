<template>
    <div class="Personal">
        <router-view></router-view>
        <el-row>
           <el-col :span="5" v-for="(item,index) in list" :key="index" :offset="0" v-show="$route.path=='/personal' ? true:false">  <!-- v-if -->
                <router-link :to="item.path">
                    <el-card>
                        <div class="pers-con">
                            <img :src="item.img"  alt="">
                            <i :class="item.icon"> {{item.name}}</i>   
                        </div>
                    </el-card>
                </router-link>
            </el-col>
        </el-row>
        
    </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      list: [
        {
          name: "个人信息",
          path: "/personal/person",
          icon: "el-icon-bell",
          img: "../../static/images/touxiang.jpg"
        },
        {
          name: "我的发布",
          path: "/personal/release",
          icon: "el-icon-bell",
          img: "../../static/images/yaocai.jpg"
        },
        {
          name: "我的患者",
          path: "/personal/patient",
          icon: "el-icon-bell",
          img: "../../static/images/huanzhe.jpg"
        },
        {
          name: "浏览创作",
          path: "/personal/composition",
          icon: "el-icon-bell",
          img: "../../static/images/liulan.jpg"
        }
      ],

      currentDate: new Date()
    };
  },
  computed: {
    ...mapGetters(["personallist"])
  }
};
</script>
<style lang="less" scoped>
.Personal {
  //   background-color: pink;
  a {
    text-decoration: none;
  }
  .el-col-offset-0 {
    margin-left: 3%;
    margin-top: 1%;
  }
  .pers-con {
    img {
      width: 250px;
      height: 250px;
    }
  }
}
</style>
