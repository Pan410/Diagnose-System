<template>
<div class="Altercon">
  <div class="Altercon_title">
    
  </div>
  <div class="Altercon_content">
    <el-table :data="Conlist" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="患者 ID">
              <span>{{ props.row.uid }}</span>
            </el-form-item>
            <el-form-item label="患者姓名">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="就诊日期">
              <span>{{ props.row.date }}</span>
            </el-form-item>
            <el-form-item label="患者症状">
              <span>{{ props.row.sym }}</span>
            </el-form-item>
            <el-form-item label="医药处方">
              <span>{{ props.row.diag }}</span>
            </el-form-item>
            <el-form-item label="医师诊断">
              <span>{{ props.row.pres }}</span>
            </el-form-item>
            <el-form-item label="特殊备注">
              <span>{{ props.row.remark }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="患者编号" prop="uid"></el-table-column>
      <el-table-column label="患者症状" prop="sym"></el-table-column>
      <el-table-column label="医师诊断" prop="diag"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="props">
          <el-button size="mini" @click="handleEdit(props.$index, props.row)" class="el-icon-edit-outline"></el-button>
          <el-button size="mini" type="danger" @click="handleDelete(props.$index, props.row)" class="el-icon-delete"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 修改医案信息 -->
    <el-dialog class="Mres" title="修改医案信息" :visible.sync="dialogupdateVisible" width="30%" >
      <el-form label-position="left" label-width="80px">
        <el-form-item label="患者姓名">
          <el-input v-model="updateCon.name"></el-input>
        </el-form-item>
        <el-form-item label="就诊日期">
          <el-input v-model="updateCon.date"></el-input>
        </el-form-item>
        <el-form-item  label="患者症状">
          <el-input type="textarea" v-model="updateCon.sym"></el-input>
        </el-form-item>
        <el-form-item label="医药处方">
          <el-input type="textarea" v-model="updateCon.diag"></el-input>
        </el-form-item>
        <el-form-item label="医师诊断">
          <el-input type="textarea" v-model="updateCon.pres"></el-input>
        </el-form-item>
        <el-form-item label="特殊备注">
          <el-input type="textarea" v-model="updateCon.remark"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="dialogupdateVisible = false">取 消</el-button>
          <el-button  @click="updateConsilia" type="primary">确 定</el-button>
      </span>
    </el-dialog>
  </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      dialogupdateVisible: false
      // name姓名，date日期，sym症状，diag患者，pres诊断，remark备注
    };
  },
  created() {
    this.getConsilia();
  },
  computed: {
    ...mapGetters(["Conlist"]), //获取患者
    ...mapGetters(["updateCon"]) //修改患者
  },
  methods: {
    //修改患者列表
    handleEdit(index, row) {
      // console.log(index, row);
      this.dialogupdateVisible = true;
      this.updateCon.id = row.Id;
      this.updateCon.name = row.name;
      this.updateCon.date = row.date;
      this.updateCon.sym = row.sym;
      this.updateCon.pres = row.pres;
      this.updateCon.diag = row.diag;
      this.updateCon.remark = row.remark;
    },
    updateConsilia() {
      this.$store
        .dispatch("updateConsilia", this.updateCon)
        .then(res => {
          this.dialogupdateVisible = false;
          this.$message.success("恭喜您,修改成功");
          // console.log(res);
        })
        .catch(error => {
          console.log(error);
          this.$message.error("修改失败");
        });
    },
    //删除医案
    handleDelete(index, row) {
      // console.log(index, row);
      var id = row.Id;
      this.$confirm("此操作将永久删除此医案, 是否继续?", "提示", {
        type: "warning"
      })
        .then(() => {
          var resdel = this.$store.dispatch("delCon", row.Id).then(res => {
            this.$message.success("成功删除");
          });
        })
        .catch(err => {
          console.log(err);
          this.$message.info("已取消删除");
        });
    },
    //获取患者列表
    getConsilia() {
      this.$store
        .dispatch("getConsilia")
        .then(res => {})
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style lang="less" scoped>
.Altercon_title {
  margin-bottom: 20px;
}

.Altercon_content {
  width: 80%;
  text-align: left;
  margin: 0 auto;
}
</style>






