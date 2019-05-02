<template>
    <!-- 增加医案 -->
    <div class="Consilia">
      <div class="Consila_title"></div>
      <div class="Consilia_content">
        <el-form ref="form" :model="consilia" label-width="80px">
          <el-form-item label="患者ID">
            <el-input v-model="consilia.id"></el-input>
          </el-form-item>
          <el-form-item label="患者症状" >
            <el-collapse accordion >
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
          <el-form-item label="医药处方">
            <el-collapse accordion>
              <el-collapse-item v-model="consilia.diag">
              <template slot="title" >
                <span v-for="item in consilia.diag" :key="item">{{item}}</span>
              </template>
              <el-transfer style="text-align: left; display: inline-block" v-model="value5" filterable  :titles="['系统诊断表', '患者诊断表']" :button-texts="['到左边', '到右边']" @change="handleChange2" :data="data2">
              </el-transfer>
              <el-button @click="submit2">提交</el-button>
            </el-collapse-item>
            </el-collapse>
          </el-form-item>
         
            <el-button type="primary" @click="createCon">立即创建</el-button>
            <el-button>取消</el-button>
          </el-form-item>
      </el-form>
     </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      movekeys1: [],
      movekeys2: [],
      data1: this.getsym(),
      data2: this.getdiag(),
      value4: [],
      value5: [],
      activeName: "1",
      consilia: {
        id: "",
        sym: "",
        diag: ""
      }
    };
  },
  methods: {
    handleChange1(movedKeys1) {
      this.movekeys1 = movedKeys1;
      // console.log(movedKeys1);
    },
    handleChange2(value) {
      this.movekeys2 = value;
      // console.log(value);
    },
    getsym() {
      let datas = [];
      this.axios.get("/api/symptom/getSymptom").then(res => {
        if (res.status == 200) {
          res.data.forEach((item, index) => {
            datas.push({
              label: item.name,
              key: item.name
            });
          });
        }
      });
      return datas;
    },
    getdiag() {
      let data = [];
      this.axios.get("/api/pharmacy/getPharmacy").then(res => {
        if (res.status == 200) {
          res.data.forEach((item, index) => {
            data.push({
              label: item.name,
              key: item.name
            });
          });
        }
      });
      return data;
    },
    submit1() {
      this.consilia.sym = this.movekeys1;
      // console.log(this.movekeys1);
    },
    submit2() {
      this.consilia.diag = this.movekeys2;
      // console.log(this.movekeys2);
    },
    createCon() {
      // console.log(this.consilia.sym.join(","));

      this.axios
        .post("/api/home/addHome", {
          id: this.consilia.id,
          sym: this.consilia.sym.join(","),
          diag: this.consilia.diag.join(",")
        })
        .then(res => {
          if (res.status == 200) {
            this.$message.success("添加成功");
          } else {
            this.$message.error("添加失败");
          }
        })
        .catch(error => {
          this.$message.error("添加失败");
          console.log(error);
        });
    }
  }
};
</script>
<style lang="less" scoped>
.Consilia {
  // width: 100%;

  .Consilia_content {
    margin: 50px auto;
    width: 80%;
    // background-color: yellow;
  }
}
</style>