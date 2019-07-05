<template>
  <div style="margin: 20px">
    <a @click="clicktext" href>
      <h1 style="display: inline">straw poll</h1>
    </a>
    <div v-if="!islogin" class="router-link">
      <el-link type="primary" @click="login">登录</el-link>
      <el-link type="success" @click="register">注册</el-link>
    </div>
    <div v-else class="router-link">
      <img src="../assets/26.gif" width="50px" style="margin-bottom:-8px" />

      <el-dropdown>
        <el-link style="font-size: 20px; font-family: 微软雅黑">{{userInfo.username}}</el-link>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-user" @click.native="userpage">我的主页</el-dropdown-item>
          <el-dropdown-item icon="el-icon-warning-outline" @click.native="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "headele",
  data() {
    return {
      islogin: false,
      userInfo: {
        username: "",
        userId: null
      }
    };
  },
  methods: {
    clicktext() {
      this.$router.push("/");
    },
    login() {
      this.$router.push("/login");
    },
    register() {
      this.$router.push("/register");
    },
    logout() {
      window.localStorage.removeItem("userInfo");
      window.localStorage.removeItem("token");
      this.islogin = false;
    },
    userpage() {
      this.$router.push("/userhome");
    }
  },
  created() {
    if (window.localStorage.getItem("token") !== null) {
      axios
        .post("http://127.0.0.1:8081/user/autologin", null, {
          headers: { Authorization: window.localStorage.getItem("token") }
        })
        .then(res => {
          if (res.data === 1) {
            this.islogin = true;
            this.userInfo = JSON.parse(window.localStorage.getItem("userInfo"));
          } else {
            window.localStorage.removeItem("userInfo");
            window.localStorage.removeItem("token");
          }
        });
    }
  }
};
</script>
<style>
.router-link {
  margin-left: 100px;
  display: inline;
}
h1 {
  font-size: 80px;
  color: rgb(111, 111, 235);
}
a {
  text-decoration: none;
}
</style>

