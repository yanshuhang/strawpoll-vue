<template>
    <div id="app">
        <h1>注册</h1>

    <br>
    <br>
    <el-form label-position="left" label-width="70px" class="form">
        <el-form-item label="用户名：">
            <el-input type="text" v-model="username"></el-input>
        </el-form-item>
        <el-form-item label="密码：">
            <el-input type="password" v-model="password"></el-input>
        </el-form-item>
    </el-form>
    <br>
    <div class="button">
        <el-button type="primary" style="width:150px">注册</el-button>
        <el-button style="width:90px" @click="toindex">取消</el-button>
    </div>
      

    
   
  </div>
</template>
<script>
export default {
    name: 'register',
    data() {
    return{
        username: '',
        password: ''
    }
  },
    methods: {
        toindex(){
            this.$router.push("/")
        }
    },
}
</script>
<style>
#app {
  text-align: center;
  margin-top: 5%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
.form{
    text-align: center;
    width: 18%;
    margin-left: 41%
}
.button{
    margin-left: 3%
}
</style>
