<template>
<!-- 我的患者 -->
    <div class="Release">
        <div class="Release-con">
        <el-table :data="Conlist" style="width: 100%">
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
                <el-table-column label="年龄" >
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <el-tag size="medium">{{ scope.row.age }}</el-tag>
                    </div>
                </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["Conlist"])
  }
};
</script>
<style lang="less" scoped>
.Release {
  .Release-con {
    width: 80%;
    margin: 0 auto;
    text-align: left;
  }
}
</style>