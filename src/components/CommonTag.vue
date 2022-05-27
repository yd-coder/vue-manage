<template>
  <div class="tabs">
    <el-tag
      v-for="(tag, index) in tags"
      :key="tag.name"
      :closable="tag.name !== 'home'"
      :effect="$route.name === tag.name ? 'dark' : 'plain'"
      @click="changeMenu(tag)"
      @close="handleClose(tag, index)"
      size="small"
    >
      {{ tag.label }}
    </el-tag>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "CommonTag",

  data() {
    return {};
  },

  computed: {
    ...mapState({
      tags: (state) => state.tab.tabsList,
    }),
  },

  mounted() {},

  methods: {
    ...mapMutations({
      close: 'closeTag'
    }),
    changeMenu(tag) {
      this.$router.push(tag.path);
    },
    handleClose(tag, index) {
      const length = this.tags.length-1
      this.close(index)
      if(tag.name !== this.$route.name){
        return; // 结束删除函数,只有删除的是当前高亮的tag才需要往下继续判断是否路由跳转
      }
      if(index === length){
        this.$router.push({
          name:this.tags[index - 1].name
          })
      }else{
        this.$router.push({
          name:this.tags[index].name
          })
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.tabs {
  padding: 10px;
  .el-tag {
    margin-right: 15px;
    cursor: pointer;
  }
}
</style>