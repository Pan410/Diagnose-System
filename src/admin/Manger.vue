<template>
    <div class="Manger">
       
       
        <div class="Manger_content">
          
        <el-button  @click="dialogcreateVisible = true" class="add" type="primary" plain>添加</el-button>
        <el-table :data="tableData" style="width: 100%">
                <el-table-column label="日期" width="300">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.date }}</span>
                </template>
                </el-table-column>
                <el-table-column label="姓名" width="300">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <el-tag size="medium">{{ scope.row.name }}</el-tag>
                    </div>
                </template>
                </el-table-column>
                <el-table-column label="角色" width="300">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <el-tag size="medium">{{ scope.row.role }}</el-tag>
                    </div>
                </template>
                </el-table-column>
                <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini"  @click="handleEdit(scope.$index, scope.row)" class="el-icon-edit-outline"></el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)" class="el-icon-delete"></el-button>
                </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 添加管理员 -->
        <el-dialog class="Mres" title="添加管理员" :visible.sync="dialogcreateVisible" width="30%" >
            <el-input v-model="manger.name"  placeholder="请输入管理员姓名"></el-input>
            <el-input type="password" v-model="manger.passwd" placeholder="请输入密码"></el-input>
            <el-select v-model="manger.role" clearable placeholder="请选择">
                <el-option v-for="item in mangerType" :key="item.label" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogcreateVisible = false">取 消</el-button>
                <el-button  @click="addAdmin" type="primary">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 修改管理员信息 -->
         <el-dialog class="Mres" title="修改管理员信息" :visible.sync="dialogupdateVisible" width="30%" >
            <el-input v-model="updatemanger.name"  placeholder="请输入管理员姓名"></el-input>
            <el-input type="password" v-model="updatemanger.passwd" placeholder="请输入密码"></el-input>
            <el-input type="password" v-model="updatemanger.password" placeholder="请输入密码"></el-input>
            <el-select v-model="updatemanger.role" clearable placeholder="请选择">
                <el-option v-for="item in mangerType" :key="item.label" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogupdateVisible = false">取 消</el-button>
                <el-button  @click="updateAdmin" type="primary">确 定</el-button>
            </span>
        </el-dialog>


    </div>
</template>
<script>
import { mapGetters } from "vuex";

import time from "../../tools/time.js";
import crypto from "../../tools/crypto.js";
export default {
  data() {
    return {
      date: "",
      dialogcreateVisible: false, //添加管理员是否弹框标志
      dialogupdateVisible: false, //修改管理员信息是否弹框标志
      mangerType: [
        //管理员类型
        { value: "General", label: "普通管理员" },
        { value: "Super", label: "超级管理员" }
      ]
      // manger: [
      //   //添加管理员数组
      //   {
      //     date: "",
      //     name: "",
      //     passwd: "",
      //     password: "",
      //     role: []
      //   }
      // ],
      // tableData: [
      //   //获取管理员数组
      //   {
      //     date: "",
      //     name: "",
      //     role: ""
      //   }
      // ],
      // updatemanger: [
      //   //修改管理员数组
      //   {
      //     id: "",
      //     name: "",
      //     passwd: "",
      //     role: ""
      //   }
      // ]
    };
  },
  created() {
    this.getAdmin();
  },
  computed: {
    ...mapGetters(["manger"]), //添加管理员列表
    ...mapGetters(["tableData"]), //获取管理员列表
    ...mapGetters(["updatemanger"]) //修改管理员列表
  },
  mounted() {
    this.date = time();
  },

  methods: {
    // 修改管理员信息
    handleEdit(index, row) {
      // console.log(index, row);
      this.updatemanger.id = row.Id;
      this.updatemanger.name = row.name;
      this.updatemanger.passwd = row.passwd;
      this.updatemanger.role = row.role;
      this.dialogupdateVisible = true;
    },
    updateAdmin() {
      this.updatemanger.passwd = this.crypto(this.updatemanger.passwd);
      this.updatemanger.password = this.crypto(this.updatemanger.password);
      if (this.updatemanger.passwd == this.updatemanger.password) {
        this.axios
          .post("/api/admin/updateAdmin", {
            id: this.updatemanger.id,
            name: this.updatemanger.name,
            passwd: this.updatemanger.passwd,
            role: this.updatemanger.role
          })
          .then(res => {
            if (res.status == 200) {
              this.dialogupdateVisible = false;
              this.$message({
                showClose: true,
                message: "恭喜您,修改成功",
                type: "success"
              });
            } else {
              this.$message.error("修改失败");
            }
            // console.log(res);
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.$message({
          showClose: true,
          message: "密码不一致，请重新输入",
          type: "error"
        });
      }
    },
    // 删除管理员
    handleDelete(index, row) {
      // console.log(index, row);
      var id = row.Id;
      this.$confirm(
        "此操作将永久删除管理员" + row.name + ", 是否继续?",
        "提示",
        { type: "warning" }
      )
        .then(() => {
          var resdel = this.axios
            .post("/api/admin/delAdmin", {
              id: row.Id
            })
            .then(res => {
              this.$message.success("成功删除" + row.name + "!");
            });
        })
        .catch(err => {
          console.log(err);
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //获取所有管理员列表
    getAdmin() {
      this.$store.dispatch("getAdmin");
    },
    //添加管理员
    addAdmin() {
      this.$store.dispatch("addAdmin", this.manger).then(res => {
        if (res.status == 200) {
          this.$message.success("恭喜您,添加成功");
        } else {
          this.$message.error("添加失败");
        }
        this.dialogcreateVisible = false;
      });
    }
  }
};
</script>
<style lang="less" scoped>
.Manger {
  .Manger_content {
    width: 90%;
    margin: 0 auto;
    text-align: left;
    // border-top: 1px solid #000;
    // background-color: lightcoral;
    .add {
      float: right;
      margin-bottom: 10px;
      font-size: 20px;
    }
  }
  .Mres {
    .el-input {
      margin-bottom: 10px;
    }
    .el-select {
      width: 100%;
    }
  }
}
</style>