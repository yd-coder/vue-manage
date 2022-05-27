<template>
  <el-form
    :model="form"
    status-icon
    :rules="rules"
    label-width="100px"
    class="login-container"
  >
    <h3 class="login-title">后台管理系统登录</h3>
    <el-form-item
      label="用户名"
      label-width="80px"
      prop="username" 
      class="username"
    >
      <el-input
        type="input"
        v-model="form.username"
        autocomplete="off"
        placeholder="请输入用户名"
      ></el-input>
    </el-form-item>
    <el-form-item
      label="密码"
      label-width="80px"
      prop="password"
    >
      <el-input
        type="password"
        v-model="form.password"
        autocomplete="off"
        placeholder="请输入密码"
      ></el-input>
    </el-form-item>
    <el-form-item class="login-submit">
      <el-button type="primary" @click="login">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import {toLogin} from '@/api/login'
export default {
  name: 'Login',

  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3,  message: '长度不得小于 3 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6,  message: '长度不得小于 6 个字符', trigger: 'blur' }
          ]
      }  
    };
  },

  mounted() {
    
  },

  methods: {
    login(){
          toLogin(this.form.username,this.form.password).then(res => {
            if (res.data.code === 0) {
             this.$message({
              message: '登录成功',
              type: 'success'
              });
              this.$store.commit('setToken', res.data.token);
              this.$router.push('/').catch(() =>{})
            } else {
              this.$message({
              message: res.data.msg,
              type: 'error'
              });
            }
          });
    }
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  border-radius: 15px;
  background-clip: padding-box;
  margin:150px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background-color: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
  .login-title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
  .login-submit {
    margin-left: 45px;  }
}
</style>