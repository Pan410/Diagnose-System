<template>
    <div class="Person">
       <el-row>
           <el-col :span="15" style="margin-left: 9%">  
                    <el-card>
                        <h3 style="color:#409EFF;margin-bottom: 20px;">我的名片</h3>
                        <div class="pers-con">
                           <p>名称: 
                            <el-tooltip class="item" effect="light" content="我最牛B我最吊因为管理是大佬" placement="top">
                                <el-button type="primary" plain>{{name}}</el-button>
                            </el-tooltip>
                            </p>
                            <p>角色: <el-button type="primary" plain>{{role}}</el-button></p>
                            <!-- <p>创建时间:<el-button type="primary" plain>{{mangerlist[0].date}}</el-button><br/></p>  -->
                        </div>
                    </el-card>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["name"]),
    ...mapGetters(["role"])
  }
};
</script>
<style lang="less" scoped>
.pers-con {
  text-align: center;
}
</style>

