<template>
    <div class="Sym">
        <div class="Sym_con">
          <el-card>
            <el-form ref="form" :model="consilia" label-width="80px">
              <el-form-item label="患者编号">{{Uid.id}}</el-form-item>
              <el-form-item label="患者症状" >
                <el-card> 
                    <el-checkbox-group v-model="checkList">
                        <el-checkbox v-for="index in symlist" :key="index.id" :label="index.name"  border></el-checkbox>
                    </el-checkbox-group>
                </el-card>
              </el-form-item>
              <el-button @click="analysis">提交</el-button>
          </el-form>
          </el-card>
        </div>
    </div>
</template>
<script>
import store from "../../store/store.js";
import { mapGetters } from "vuex";

export default {
  props: ["Uid"],
  data() {
    return {
      checkList: [],
      consilia: {
        sym: ""
      },
      symList: []
    };
  },
  created() {
    this.getSymlist();
  },
  computed: {
    ...mapGetters(["symlist"]) //获取药材
  },
  methods: {
    getSymlist() {
      //获取症状
      this.$store.dispatch("getSymlist");
    },
    analysis() {
      var symNm = new Map();
      var m = new Map([[1, "x"], [2, "y"], [3, "z"]]);
      for (var i = 0; i < this.symlist.length; i++) {
        symNm.set(this.symlist[i].name, this.symlist[i].sid);
      }
      var symId = [];
      for (var j = 0; j < this.checkList.length; j++) {
        symId[j] = symNm.get(this.checkList[j]);
      }
      if (this.checkList.length == 0) {
        this.$message.error("请勾选症状");
      } else {
        this.axios
          .post("/api/bayesSym/addSym", {
            uid: this.Uid.id,
            sid: symId.join(",")
          })
          .then(res => {
            if (res.status == 200) {
              this.symList[0] = this.Uid.id;
              this.symList[1] = this.checkList.join(",");
              this.symList[2] = this.Uid.name;
              this.$emit("myfun", 3, this.symList);
              this.$message.success("提交成功,正在计算请耐心等待15s");
            } else {
              this.$message.error("提交失败");
            }
          })
          .catch(err => {
            this.$message.error("提交失败");
            console.log(err);
          });
      }
    }
  }
};
</script>
<style lang="less" scoped>
.Sym {
  width: 90%;
  margin: 30px auto;
  .el-checkbox {
    width: 125px;
    margin: 5px 5px;
  }
}
</style>