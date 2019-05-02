<template>
    <div class="Phy">
        <div class="Phy_con">
            <el-card>
            <el-form ref="form"  label-width="80px">
                <el-form-item label="患者编号">{{symList[0]}}</el-form-item>
                <el-form-item label="推荐药材" >
                    <el-card>
                        <el-checkbox-group v-model="checkList1">
                            <el-checkbox v-for="item in phyBlist" :key="item" :label="item" border></el-checkbox>
                        </el-checkbox-group>
                    </el-card>
                </el-form-item>
                <el-form-item label="全部药材" >
                    <el-card> 
                        <el-checkbox-group v-model="checkList2">
                            <el-checkbox v-for="index in phalist" :key="index.id" :label="index.name" border></el-checkbox>
                        </el-checkbox-group>
                    </el-card>
                </el-form-item>
              <el-button style="margin-top: 12px;" @click="search">完成医案</el-button>                
            </el-form>
            </el-card>
        </div>
    </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  props: ["symList"],
  data() {
    return {
      bayesPhy: {
        id: "",
        name: "",
        phy: ""
      },
      checkList1: [],
      checkList2: [],
      phyBlist: [],
      list: []
    };
  },
  computed: {
    ...mapGetters(["phalist"])
  },
  created() {
    this.getPhy();
    this.getphalist();
  },
  methods: {
    getPhy() {
     setTimeout(() => {
        this.axios
          .post("/api/bayesPhy/getPhy", {
            uid: this.symList[0]
          })
          .then(res => {
            this.phyBlist = res.data[0].mids.split(",");
            //   console.log(this.phyBlist);
          });
      }, 15000);

    },
    getphalist() {
      //获取药材
      this.$store.dispatch("getPhaList");
    },
    search() {
      var sym = this.checkList1.join(",") + "," + this.checkList2.join(",");
      var phy = this.symList[1];
      this.axios
        .post("/api/consilia/addsConsilia", {
          uid: this.symList[0],
          sym: sym,
          diag: phy,
          date: new Date().toLocaleDateString(),
          name: this.symList[2]
        })
        .then(res => {
          if (res.status == 200) {
            this.$emit("listenToChildEvent", 1, this.symList[0]);
            this.$message.success("添加成功,自动跳转首页");
	    this.axios.post("/api/bayesPhy/delPhy");
          } else {
            this.$message.error("添加失败");
          }
        })
        .catch(err => {
          this.$message.error("添加失败");
          console.log(err);
        });
    }
  }
};
</script>
<style lang="less" scoped>
.Phy {
  width: 90%;
  margin: 30px auto;
  .el-checkbox {
    width: 100px;
    margin: 5px 5px;
  }
}
</style>