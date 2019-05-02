<template>
<!-- 我的发布 -->
    <div class="Release">
        <div class="Release-con">
            <el-collapse  v-for="(item,index) in mycrealist" :key="index"  style="padding-bottom: 15px" accordion>
                <el-collapse-item>
                    <template slot="title">{{item.title}}--{{item.auther}}</template>
                <div>{{item.content}}</div>
            </el-collapse-item>
          </el-collapse>
        </div>
    </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["mycrealist"]),
    ...mapGetters(["name"]) //当前用户
  },
  created() {
    this.getMycrealist();
  },
  methods: {
    getMycrealist() {
      //   console.log(this.name);
      this.$store.dispatch("getMycrealist", this.name);
    }
  }
};
</script>
<style lang="less" scoped>
.Release {
  width: 100%;
  .Release-con {
    width: 80%;
    margin: 0 auto;
  }
}
</style>

