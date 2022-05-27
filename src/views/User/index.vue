<template>
  <div class="manage">
    <!-- 添加弹窗 -->
    <el-dialog
      :title="operateType === 'add' ? '新增用户' : '编辑用户'"
      :visible.sync="isShow"
    >
      <common-form
        :formLabel="userFormLabel"
        :form="userForm"
        :inline="true"
      ></common-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取消</el-button>
        <el-button @click="confirm" type="primary">确定</el-button>
      </div>
    </el-dialog>

    <div class="manage-header">
      <el-button type="primary"  @click="addUser">+ 新增</el-button>
      <common-form
        :formLabel="searchFormLabel"
        :form="searchForm"
        :inline="true"
        ref="form"
      >
        <el-button type="primary" @click="getList(searchForm.keyword)">搜索</el-button>
      </common-form>
    </div>
    <!-- 表格-分页 -->
    <common-table
      :tableData="tableData"
      :tableLabel="tableLabel"
      :page="page"
      :total="total"
      @currentChange="currentChange"
      @edit="editUser"
      @delete="deleteUser"
    >
    </common-table>
  </div>
</template>

<script>
import CommonForm from '@/components/CommonForm.vue';
import CommonTable from '@/components/CommonTable.vue';
import {getUser} from '@/api/data.js'

export default {
  components: { CommonForm, CommonTable },
  name: 'Index',

  data() {
    return {
      operateType: 'add',
      isShow: false,
      userFormLabel: [
        {
          model: 'name',
          label: '姓名',
          type: 'input'
        },
        {
          model: 'age',
          label: '年龄',
          type: 'input'
        },
        {
          model: 'sex',
          label: '性别',
          type: 'select',
          opts: [
            {
              label: '男',
              value: 1
            },
            {
              label: '女',
              value: 0
            }
          ]
        },
        {
          model: 'birth',
          label: '出生日期',
          type: 'date'
        },
        {
          model: 'address',
          label: '地址',
          type: 'input'
        },
      ],
      userForm: {
        name: '',
        age: '',
        sex : '',
        birth: '',
        address: ''
      },
      searchFormLabel: [
        {
          model: 'keyword',
          label: '',
          type: 'input'
        }
      ],
      searchForm: {
        keyword: ''
      },
      tableData: [],
      tableLabel: [
        {
          prop: "name",
          label: "姓名"
        },
        {
          prop: "age",
          label: "年龄"
        },
        {
          prop: "sex",
          label: "性别"
        },
        {
          prop: "birth",
          label: "出生日期",
          width: 150
        },
        {
          prop: "address",
          label: "地址",
          width: 250
        },
      ],
      page: 1,
      total: 0
    };
  },


  created() {
    this.getUserData(this.page,10)
  },

  mounted() {
    
  },

  methods: {
    confirm(){

    },
    addUser(){
      this.isShow = true
      this.operateType = 'add'
      this.userForm = {
        name: '',
        age: '',
        sex : '',
        birth: '',
        address: ''
      }
    },
    // 表格搜索
    getList(){

    },
    getUserData(page,limit){
      getUser(page,limit).then(res=>{
        this.tableData = res.data.data.map(item=>{
          item.sex = item.sex === 0 ? '女' : '男'
          return item
        })
        this.page = parseInt(res.data.page)
        this.total = res.data.total
      })
    },
    editUser(row){
      this.isShow = true
      this.operateType = 'edit'
      this.userForm = row
    },
    deleteUser(row){
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    currentChange(current){
      this.getUserData(current,10)
    }
  },
};
</script>

<style lang="scss" scoped>
.manage-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
</style>