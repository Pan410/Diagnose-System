<template>
    <!-- 增加症状 -->
    <div class="Symptom">
     <el-input class="con" placeholder="请输入症状" v-model="name" clearable></el-input>
     <el-input class="con" placeholder="请输入备注" v-model="remark" clearable></el-input>
     <el-button class="ok" type="primary" @click="addSymptom">确认添加</el-button>
    </div>
</template>
<script>
export default {
  data() {
    return {
      name: "",
      remark: ""
    };
  },
  methods: {
    addSymptom() {
      if (this.name == "") {
        this.$message.error("症状不能为空");
      } else {
        this.axios
          .post("/api/symptom/addSymptom", {
            name: this.name,
            remark: this.remark
          })
          .then(res => {
            if (res.data.resultCode == 200) {
              this.$message.success(res.data.msg);
            } else {
              this.$message.error(res.data.msg);
            }
          })
          .catch(err => {
            console.log(err);
            this.$message.error("添加失败");
          });
      }
    }
  }
};
</script>
<style lang="less" scoped>
.Symptom {
  width: 80%;
  margin: 0 auto;
  padding-top: 100px;
  // background-color: pink;
  .con {
    margin-bottom: 20px;
    width: 50%;
  }
  .ok {
    width: 50%;
  }
}
</style>