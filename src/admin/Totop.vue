<template>
<!-- 返回顶部 -->
    <div class="Totop">
        <div class="totop-con" @click="scrollToTop" v-show="totopShow">
            <i class="el-icon-caret-top"></i>
        </div>  
    </div>
</template>
<script>
export default {
  data() {
    return {
      totopShow: false,
      scrollTop: ""
    };
  },
  methods: {
    handleScroll() {
      this.scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      if (this.scrollTop > 200) {
        this.totopShow = true;
      } else {
        this.totopShow = false;
      }
    },
    scrollToTop() {
      //   console.log("出现");
      this.scrollTop = window.pageYOffset = document.documentElement.scrollTop = document.body.scrollTop = 0;
    }
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  }
  //   destroyed() {
  //     window.removeEventListener("scroll", this.handleScroll);
  //   }
};
</script>
<style lang="less" scpoed>
.totop-con {
  background-color: #fff;
  position: fixed;
  right: 100px;
  bottom: 150px;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  cursor: pointer;
  transition: 0.3s;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
  z-index: 99;
  i {
    color: #409eff;
    display: block;
    line-height: 40px;
    text-align: center;
    font-size: 18px;
  }
}
</style>
