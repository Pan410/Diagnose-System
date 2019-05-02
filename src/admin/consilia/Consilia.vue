<template>
    <!-- 增加医案 -->
    <div class="Consilia">
      <div class="Consilia_con">
        <div class="Consilia_btn">
          <el-steps :active="active">
            <el-step title="填写患者信息" icon="el-icon-edit"></el-step>
            <el-step title="填写患者症状" icon="el-icon-upload"></el-step>
            <el-step title="完成医案" icon="el-icon-picture"></el-step>
          </el-steps>
        </div>
        <div class="Consilia_kk">
          <Info v-on:listenToChildEvent="showMsgFromChild" v-if="active ===1"></Info>
          <Sym v-bind:Uid="Uid" v-on:myfun="showSymList" v-if="active ===2"></Sym>
          <Phy v-bind:symList="symList" v-on:listenToChildEvent="showMsgFromChild"  v-if="active ===3"></Phy>
        </div>
      <!-- <el-button style="margin-top: 12px;" @click="next" v-if="active==2">完成医案</el-button>  -->
      </div>
    </div> 
</template>
<script>
import Info from "./Info.vue";
import Sym from "./Sym.vue";
import Phy from "./Phy.vue";

import { mapGetters } from "vuex";
import store from "../../store/store.js";
export default {
  data() {
    return {
      active: 1,
      Uid: "",
      symList: []
    };
  },
  components: {
    Info,
    Sym,
    Phy
  },
  computed: {
    // ...mapGetters(["sicklist"])
  },
  methods: {
    showMsgFromChild(a, b) {
      this.active = a;
      this.Uid = b;
    },
    showSymList(a, b) {
      this.active = a;
      this.symList = b;
    }
  }
};
</script>
<style lang="less" scoped>
.Consilia_con {
  margin: 50px auto;
  margin-top: 25px;
  width: 80%;
  .Consilia_kk {
    // height: 400px;
    border: 1px solid #ccc;
  }
  .Consilia_btn {
    width: 80%;
    margin: 20px auto;
  }
}
</style>