<template>
<!-- 浏览创作 -->
    <div class="Compos">
        <!-- <Search></Search> -->
       <div class="Compos-con">
           <el-collapse  v-for="(item,index) in everycealist" :key="index"  @change="handleChange" style="padding-bottom: 15px" accordion>
                <el-collapse-item>
                    <template slot="title">{{item.title}}--{{item.auther}}</template>
                <div>{{item.content}}</div>
            </el-collapse-item>
          </el-collapse>
       </div>
    </div>
</template>
<script>
// import Search from "../search/Search.vue";
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },

  computed: {
    ...mapGetters(["everycealist"]) //所有浏览创作
  },
  // components: {
  //   Search
  // },
  created() {
    this.getEverylist();
  },
  methods: {
    getEverylist() {
      this.$store.dispatch("getEverycealist");
    },
    handleChange(val) {
      console.log(val);
    }
  }
};
</script>
<style lang="less" scoped>
.Compos {
  width: 100%;
  .Search {
    margin-bottom: 20px;
  }
  .Compos-con {
    width: 80%;
    margin: 0 auto;
  }
}
</style>
