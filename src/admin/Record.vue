<template>
    <div class="Record">
        <div class="Record-con">
        <el-form :label-position="left" ref="creationlist" :rules="rules" :model="creationlist" label-width="100px" >
          <el-form-item label="创作题目" prop="title">
            <el-input v-model="creationlist.title"></el-input>
          </el-form-item>
          <el-form-item label="创作作者">
            <el-input  v-model="name" disabled></el-input>
          </el-form-item>
          <el-form-item label="创作时间" prop="date">
              <el-date-picker type="date" placeholder="选择日期" v-model="creationlist.date" style="width: 100%;"></el-date-picker>
          </el-form-item>
          <el-form-item label="创作内容" prop="content">
            <el-input type="textarea" v-model="creationlist.content"></el-input>
          </el-form-item>
          <el-form-item label="是否可见">
            <el-switch v-model="creationlist.look"></el-switch>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('creationlist')">立即创建</el-button>
            <el-button>取消</el-button>
          </el-form-item>
      </el-form>
      </div>
    </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      left: "left",
      creationlist: {
        title: "",
        auther: "",
        date: "",
        content: "",
        look: "false"
      },
      rules: {
        title: [
          { required: true, message: "请输入创作题目", trigger: "blur" },
          { min: 3, max: 20, message: "长度在 3 到 20 个字符", trigger: "blur" }
        ],
        date: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        content: [
          { required: true, message: "请输入创作内容", trigger: "blur" },
          {
            min: 5,
            max: 500,
            message: "长度在 5 到 500 个字符",
            trigger: "blur"
          }
        ]
      }
    };
  },
  computed: {
    ...mapGetters(["name"])
  },
  methods: {
    submitForm(creationlist) {
      this.$refs.creationlist.validate(valid => {
        if (valid) {
          this.axios
            .post("/api/recordApi/addCreation", {
              title: this.creationlist.title,
              auther: this.name,
              date: this.creationlist.date,
              content: this.creationlist.content,
              look: this.creationlist.look
            })
            .then(res => {
              if (res.data.resultCode == 200) {
                // console.log(res);
                this.$message.success(res.data.msg);
              }
            })
            .catch(error => {
              console.log(error);
            });
        } else {
          return false;
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.Record {
  width: 100%;
  .Record-con {
    margin: 50px auto;
    width: 80%;
    .el-switch {
      float: left;
      height: 40px;
    }
  }
}
</style>
