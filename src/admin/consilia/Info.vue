<template>
    <!-- 增加医案 -->
    <div class="Info" >
        <div class="Info_con">
          <el-tabs type="border-card">
            <el-tab-pane label="新患者">
                <el-form :model="sicklist" :rules="rules" ref="sicklist" label-width="100px" class="demo-sicklist">
                  <el-form-item label="患者名称" prop="name">
                      <el-input v-model="sicklist.name"></el-input>
                  </el-form-item>
                  <el-form-item label="患者性别" prop="sex">
                      <el-radio-group v-model="sicklist.sex">
                          <el-radio label="男"></el-radio>
                          <el-radio label="女"></el-radio>
                      </el-radio-group>
                  </el-form-item>
                  <el-form-item label="患者年龄" prop="age">
                      <el-input v-model="sicklist.age"></el-input>
                  </el-form-item>
                  <el-form-item label="就诊时间" prop="date">
                      <el-date-picker type="date" placeholder="选择日期" v-model="sicklist.date" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                  <el-form-item label="身份证号" prop="card">
                      <el-input v-model="sicklist.card"></el-input>
                  </el-form-item>
                  <el-form-item label="联系方式" prop="iphone">
                      <el-input v-model="sicklist.iphone"></el-input>
                  </el-form-item>
                  <el-form-item label="患者病史" prop="history">
                      <el-input v-model="sicklist.history"></el-input>
                  </el-form-item>
                  <el-form-item label="家庭住址" prop="place">
                      <el-input v-model="sicklist.place"></el-input>
                  </el-form-item>
                  <el-button style="margin-top: 12px;" @click="register('sicklist')">注册</el-button>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="老患者">
             <el-checkbox-group v-model="dx">
               <el-row>
                <el-col :span="12">
                  <el-checkbox label="2" >
                    <el-input    placeholder="请输入患者编号" v-model="checkList.id"></el-input>
                  </el-checkbox>
                  </el-col>
                  <el-col :span="12">
                  <el-checkbox label="4">
                    <el-input  placeholder="请输入患者姓名" v-model="checkList.name"></el-input>
                  </el-checkbox>
                </el-col>
                <el-col :span="12">
                  <el-checkbox label="8">
                    <el-input  placeholder="请输入身份证号" v-model="checkList.card"></el-input>
                  </el-checkbox>
                </el-col>
                <el-col :span="12">
                  <el-checkbox label="16">
                    <el-input  placeholder="请输入联系方式" v-model="checkList.iphone"></el-input>  
                  </el-checkbox>
                </el-col>
               </el-row>
              <el-button style="margin-top: 12px;" @click="search(checkList)">搜索</el-button>
            </el-checkbox-group>
              <el-card class="Info_card" v-if="show==1">
                <el-table :data="userSicklist" style="width: 100%">
                  <el-table-column label="编号" width="90">
                    <template slot-scope="scope">{{ scope.row.id }}</template>
                  </el-table-column>
                  <el-table-column label="姓名" width="150">
                    <template slot-scope="scope">{{ scope.row.name }}</template>
                  </el-table-column>
                  <el-table-column label="身份证号" width="180">
                    <template slot-scope="scope">{{ scope.row.card }}</template>
                  </el-table-column>
                  <el-table-column label="电话" width="180">
                    <template slot-scope="scope">{{ scope.row.iphone }}</template>
                  </el-table-column>
                  <el-table-column label="操作" width="160">
                    <template slot-scope="scope">
                      <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">确认</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-card>
            </el-tab-pane>   
          </el-tabs>  
        </div>  
    </div> 
</template>
<script>
import { mapGetters } from "vuex";
import store from "../../store/store.js";
export default {
  data() {
    return {
      show: 0,
      sicklist: {
        id: "",
        name: "",
        sex: "",
        age: "",
        date: "",
        card: "",
        iphone: "",
        history: "",
        place: ""
      },
      dx: [],
      checkList: {
        id: "",
        name: "",
        card: "",
        iphone: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入患者名称", trigger: "blur" },
          { min: 1, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        date: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        sex: [
          {
            required: true,
            message: "请选择性别",
            trigger: "blur"
          }
        ],
        age: [
          {
            required: true,
            message: "请输入患者年龄",
            trigger: "blur"
          }
        ]
      }
    };
  },
  computed: {
    ...mapGetters(["userSicklist"]) //查找出的老用户列表
  },
  methods: {
    register(sick) {
      //新患者注册
      this.sicklist.id = Number(
        Math.random()
          .toString()
          .substr(3, length) + Date.now()
      ).toString(36);
      this.$refs[sick].validate(valid => {
        this.$store
          .dispatch("addSick", this.sicklist)
          .then(res => {
            if (res.data.resultCode === 200) {
              this.$message.success("添加成功,进行下一步");
              this.$emit("listenToChildEvent", 2, this.sicklist);
            }
          })
          .catch(error => {
            this.$message.error("添加失败");
            console.log(error);
          });
      });
    },
    search(checkList) {
      if (this.dx.length) {
        this.show = 1;
        let j = 0;
        for (var i = 0; i < this.dx.length; i++) {
          j = j + parseInt(this.dx[i]);
        }
        this.checkList.num = j;
        this.$store.dispatch("getUserSick", this.checkList);
      }
    },
    handleEdit(index, row) {
      this.$emit("listenToChildEvent", 2, row);
    }
  }
};
</script>
<style lang="less" scoped>
.Info {
  .Info_con {
    width: 90%;
    margin: 30px auto;
    .Info_card {
      margin-top: 20px;
    }
    .el-card__body {
      background-color: pink;
      text-align: left;
      float: left;
    }
  }
}
</style>