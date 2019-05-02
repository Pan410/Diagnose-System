<template>
    <div class="Alterpha">
        <el-select v-model="value" filterable remote placeholder="请输入关键词" :remote-method="remoteMethod" :loading="loading">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <el-button type="primary" icon="el-icon-search"  @click="search(value)">搜索</el-button>
        <!-- 药材应用 -->
        <div class="Alterpha_content" >
            <div class="sym" v-for="(item, index) in phalist" :key="index" :data="phalist">
            <el-popover placement="top-start" :title=phalist[index].name width="200" trigger="hover" :content=phalist[index].remark>
             <el-button slot="reference" @click="handleEdit(index, phalist[index])">{{phalist[index].name}}</el-button >
            </el-popover>
            </div>
        </div>
        <!-- 弹框 -->
        <el-dialog class="Sres" title="修改药材信息" :model="Alterpha" :visible.sync="dialogalterVisible" width="30%" >
            <el-input v-model="Alterpha.name"  placeholder="请输入药材名"></el-input>
            <el-input v-model="Alterpha.remark" placeholder="请输入备注"></el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delPha" type="danger">删除 </el-button>
                <el-button  @click="updatePha" type="primary">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      dialogalterVisible: false, //药材弹框
      options: [],
      value: [],
      loading: false,
      list: []
    };
  },
  created() {
    this.getphalist();
  },
  computed: {
    ...mapGetters(["phalist"]), //获取药材
    ...mapGetters(["Alterpha"]) //修改药材
  },
  mounted() {
    this.list = this.phalist.map(item => {
      // console.log(item.name);
      return {
        value: item.name,
        label: item.name
      };
    });
  },
  methods: {
    getphalist() {
      //获取药材
      this.$store.dispatch("getPhaList");
    },
    handleEdit(index, row) {
      //   console.log(index, row);
      this.Alterpha.id = row.Id;
      this.Alterpha.name = row.name;
      this.Alterpha.remark = row.remark;
      this.dialogalterVisible = true;
    },
    delPha() {
      //删除药材
      this.$store
        .dispatch("delPha", this.Alterpha.id)
        .then(res => {
          this.dialogalterVisible = false;
          this.$confirm("此操作将永久删除该药材, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              this.$message.success("删除成功!");
            })
            .catch(() => {
              this.$message.info("已取消删除");
            });
        })
        .catch(err => {
          console.log(err);
        });
    },
    updatePha() {
      //修改药材
      if (this.Alterpha.name == "") {
        this.$message.error("药材名不能为空");
      } else {
        this.$store
          .dispatch("updatePha", this.Alterpha)
          .then(res => {
            this.$message.success("修改成功");
            this.dialogalterVisible = false;
          })
          .catch(error => {
            console.log(error);
            this.$message.error("修改失败");
          });
      }
    },
    remoteMethod(query) {
      if (query !== "") {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.options = this.list.filter(item => {
            return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
          });
        }, 200);
      } else {
        this.options = [];
      }
    },
    search(value) {
      this.dialogalterVisible = true;
      this.Alterpha.name = value;
      // console.log(value);
    }
  }
};
</script>

<style lang="less" scoped>
.Alter_title {
  // background-color: lawngreen;
  width: 100%;
  .el-input {
    margin-top: 10px;
    width: 35%;
  }
}
.Alterpha_content {
  width: 95%;
  margin: 0 auto;
  padding-top: 30px;
  // background-color: pink;
  .el-button {
    width: 150px;
  }
  .sym {
    float: left;
    margin: 10px 10px;
  }
}
.Sres {
  .el-input {
    margin: 10px 0px;
  }
}
</style>
