<template>
    <div class="Search" >
           <el-select v-model="value9" filterable remote placeholder="请输入关键词" :remote-method="remoteMethod" :loading="loading">
              <el-option v-for="item in options4" :key="item.value" :label="item.label" :value="item.value"></el-option>
           </el-select>
           <el-button type="primary" icon="el-icon-search"  @click="search(value9)">搜索</el-button>
    </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      dialogalterVisible: false,
      options4: [],
      value9: [],
      loading: false,
      list: []
    };
  },
  computed: {
    ...mapGetters(["symlist"]), //获取症状
    ...mapGetters(["phalist"]) //获取药材
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
    remoteMethod(query) {
      if (query !== "") {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.options4 = this.list.filter(item => {
            return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
          });
        }, 200);
      } else {
        this.options4 = [];
      }
    },
    search(value9) {
      this.dialogalterVisible = true;
      // console.log(value9);
    }
  }
};
</script>
<style lang="less" scoped>
.Search {
  width: 100%;
  .el-input {
    margin-top: 10px;
    width: 35%;
  }
}
</style>
