<template>
<!-- 所有症状 -->
    <div class="Altersym">
        <el-select v-model="value" filterable remote placeholder="请输入关键词" :remote-method="remoteMethod" :loading="loading">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <el-button type="primary" icon="el-icon-search"  @click="search(value)">搜索</el-button>
        <!-- 症状应用 -->
        <div class="Altersym_content" >
            <div class="sym" v-for="(item, index) in symlist" :key="index" :data="symlist">
            <el-popover placement="top-start" :title=symlist[index].name width="200" trigger="hover" :content=symlist[index].remark>
             <el-button slot="reference" @click="handleEdit(index, symlist[index])">{{symlist[index].name}}</el-button >
            </el-popover>
            </div>
        </div>
        <!-- 弹框 -->
        <el-dialog class="Sres" title="修改症状信息" :model="altersym" :visible.sync="dialogalterVisible" width="30%" >
            <el-input v-model="altersym.name"  placeholder="请输入症状名"></el-input>
            <el-input v-model="altersym.remark" placeholder="请输入备注"></el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delSym" type="danger">删除 </el-button>
                <el-button  @click="updateSym" type="primary">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      dialogalterVisible: false, //症状弹框
      options: [],
      value: [],
      loading: false,
      list: []
    };
  },
  created() {
    this.getSymlist();
  },
  computed: {
    ...mapGetters(["symlist"]), //获取症状
    ...mapGetters(["altersym"]) //修改症状
  },
  mounted() {
    this.list = this.symlist.map(item => {
      // console.log(item.name);
      return {
        value: item.name,
        label: item.name
      };
    });
  },
  methods: {
    getSymlist() {
      //获取症状
      this.$store
        .dispatch("getSymlist")
        .then(res => {})
        .catch(err => {
          this.$message.error("获取失败");
          console.log(err);
        });
    },
    handleEdit(index, row) {
      //   console.log(index, row);
      this.altersym.id = row.Id;
      this.altersym.name = row.name;
      this.altersym.remark = row.remark;
      this.dialogalterVisible = true;
    },
    delSym() {
      //删除症状
      this.$store
        .dispatch("delSym", this.altersym.id)
        .then(res => {
          this.dialogalterVisible = false;
          this.$confirm("此操作将永久删除该症状, 是否继续?", "提示", {
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
        .catch(error => {
          this.$message.error("删除失败");
          console.log(error);
        });
    },
    updateSym() {
      //修改症状
      if (this.altersym.name == "") {
        this.$message.error("症状名不能为空");
      } else {
        this.$store
          .dispatch("updateSym", this.altersym)
          .then(res => {
            // console.log(res);

            this.dialogalterVisible = false;
            this.$message.success("修改成功");
          })
          .catch(err => {
            this.$message.error("修改失败");
            console.log(err);
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
      this.altersym.name = value;
      // console.log(value);
    }
  }
};
</script>

<style lang="less" scoped>
.Altersym_content {
  width: 95%;
  padding-top: 30px;
  margin: 0 auto;
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
