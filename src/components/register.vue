<template>
  <div id="app">
    <h1>注册</h1>

    <br />
    <br />
    <el-form label-position="left" label-width="70px" class="form">
      <el-form-item label="用户名：">
        <el-input type="text" v-model="user.username"></el-input>
      </el-form-item>
      <el-form-item label="密码：">
        <el-input type="password" v-model="user.password"></el-input>
      </el-form-item>
    </el-form>
    <br />
    <div class="button">
      <el-button type="primary" style="width:150px" @click="userregister">注册</el-button>
      <el-button style="width:90px" @click="toindex">取消</el-button>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import jwt from 'jsonwebtoken'

export default {
  name: "register",
  data() {
    return {
      user: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    toindex() {
      this.$router.push("/");
    },
    userregister() {
      axios.post('http://127.0.0.1:8081/user/register', this.user).then(res => {
				let token = res.data
				let payload = jwt.decode(token,{complete: true}).payload
				window.localStorage.setItem("token", res.data)
        window.localStorage.setItem("userInfo",JSON.stringify(payload))
        this.$router.push("/")
			})
    }
  }
};
</script>
<style>
#app {
  text-align: center;
  margin-top: 5%;
  font-family: 微软雅黑;
}
.form {
  text-align: center;
  width: 18%;
  margin-left: 41%;
}
.button {
  margin-left: 3%;
}
</style>
