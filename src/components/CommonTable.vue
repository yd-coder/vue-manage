<template>
  <div class="common-table">
    <el-table :data="tableData" stripe>
      <!-- 表格数据列 -->
      <el-table-column
        v-for="item in tableLabel"
        :key="item.prop"
        :label="item.label"
        :prop="item.prop"
        :width="item.width ? item.width : 125"
      >
      </el-table-column>
      <!-- 编辑删除列 -->
      <el-table-column align="right" min-width="180">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      class="pager"
      layout="prev, pager, next"
      :total="total"
      :current-page.sync="page"
      :page-size="10"
      @current-change="currentChange"
      @prev-click="prevClick"
      @next-click="nextClick"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'CommonTable',
  props: {
    tableData: Array,
    tableLabel: Array,
    page: Number,
    total: Number
  },

  data() {
    return {};
  },

  methods: {
    handleEdit(index, row){
      this.$emit('edit',row)
    },
    handleDelete(index, row){
      this.$emit('delete',row)
    },
    currentChange(current){
      this.$emit('currentChange',current)
    },
    prevClick(index){
      // console.log(index);
    },
    nextClick(index){
      // console.log(index);
    }
  },
};
</script>

<style lang="scss" scoped>
.common-table {
  height: calc(100% - 62px);
  background-color: #fff;
  position: relative;
  .pager {
    position: absolute;
    bottom: 0;
    right: 0;
  }
  
}
</style>