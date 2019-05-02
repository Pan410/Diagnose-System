<template>
    <div class="Sym">
        <div class="Sym_con">
            <el-form ref="form" :model="consilia" label-width="80px">
              <el-form-item label="患者编号">{{Uid}}</el-form-item>
              <el-form-item label="患者症状" >
                <el-collapse v-model="activeName" accordion >
                  <el-collapse-item v-model="consilia.sym">
                    <template slot="title">
                      <span v-for="item in consilia.sym" :key="item">{{item}}</span>
                    </template>
                    <el-transfer style="text-align: left; display: inline-block" v-model="value4" filterable  :titles="['系统症状表', '患者症状表']" :button-texts="['到左边', '到右边']" @change="handleChange1" :data="data1">
                    </el-transfer>
                    <el-button @click="submit1">提交</el-button> 
                  </el-collapse-item>  
                </el-collapse>
              </el-form-item>
              <el-button @click="analysis">提交</el-button>
          </el-form>
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
      movekeys1: [],
      data1: this.getsym(),
      value4: [],
      activeName: "1",
      consilia: {
        id: "",
        name: "",
        date: "",
        sym: "",
        diag: "",
        pres: "",
        remark: ""
      }
    };
  },
  methods: {
    handleChange1(movedKeys1) {
      this.movekeys1 = movedKeys1;
    },
    getsym() {
      let datas = [];
      this.axios.get("/api/symptom/getSymptom").then(res => {
        if (res.status == 200) {
          res.data.forEach((item, index) => {
            datas.push({
              label: item.name,
              key: item.id
            });
          });
        }
      });
      return datas;
    },

    submit1() {
      this.activeName = 0;
      this.consilia.sym = this.movekeys1;
    },
    analysis() {
      var a = this.consilia.sym.join(",").split(",");
      var bys = new Array();
      for (var i = 0; i < a.length; i++) {
        bys.push([this.Uid, a[i]]);
      }
      // console.log(bys);
      this.axios
        .post("/api/consilia/addConsilia", {
          bys
        })
        .then(res => {
          if (res.status == 200) {
            this.$emit("listenToChildEvent", 2, this.Uid);
            this.$message.success("提交成功,正在计算");
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
};
</script>
<style lang="less" scoped>
.Sym {
  width: 90%;
  margin: 30px auto;
}
</style>