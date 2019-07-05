<template>
  <div>
    <headele></headele>
    <el-card class="box-card">
      <br>
      <input type="text" v-model="title" placeholder="输入标题" class="nobordertitle">
      <br>
      <input
        type="text"
        placeholder="选项"
        class="noborder"
        v-for="(list) in lists"
        :key="list.id"
        @input="addinput(list.id)"
        v-model="list.title"
      >
      <br>
      <br>
      <el-button type="primary" style="width:20%;  margin-left: -45%" @click="toshowvote" @keyup.enter="toshowvote">创建</el-button>
      <span>多选：</span>
      <select v-model="limit">
        <option v-for="(item, index) in limitlist" :key="index" :value="item">{{item}}</option>
      </select>
      <br>
      <br>
    </el-card>
  </div>
</template>
<script>
import axios from "axios";
import headele from './headele'

export default {
  name: "createvote",
  components: {
    headele
  },
  data() {
    return {
      id: 0,
      title: "",
      lists: [{ id: 1, title: "" }, { id: 2, title: "" }, { id: 3, title: "" }],
      nextId: 4,
      limit: 1,
      limitlist:[1,2,3]
    };
  },
  methods: {
    addinput(listid) {
      if (listid === this.lists.length) {
        let nextlist = {
          id: this.nextId++,
          title: ""
        };
        this.lists.push(nextlist);
      }
    },
    toshowvote() {
      let data = {
        title: "",
        optionList: "",
        limit: this.limit,
        userId: null,
      };
      let userInfo = window.localStorage.getItem("userInfo")
      if (userInfo !== null) {
        data.userId = JSON.parse(userInfo).userId
      }

      data.title = this.title.trim();
      
      for (const option of this.lists) {
        option.title = option.title.trim();
      }
      data.optionList = this.lists.filter(item => item.title.trim() != "");
      if (data.title !== '' && data.optionList.length > 1 && data.optionList.length > this.limit) {
        axios.post("http://127.0.0.1:8081/poll/create", data,{headers:{Authorization: window.localStorage.getItem("token")}}).then(res => {
        this.id = res.data;
        this.$router.push("/" + this.id);
      });
      } else if(data.title === ''){
        alert("标题不能为空")
      } else if(data.optionList.length < 2){
        alert("选项不能少于两个")
      } else if(data.optionList.length <= this.limit){
        alert("可选择数量必须小于选项数量")
      }
    }
  }
};
</script>
<style>
.box-card {
  width: 40%;
  margin-left: 30%;
}
.nobordertitle {
  border-bottom: 1px solid #000;
  border-top: 0px;
  border-left: 0px;
  border-right: 0px;
  outline: none;
  width: 85%;
  height: 50px;
  font-size: 40px;
  margin: 20px;
  font-family: 微软雅黑;
}
.noborder {
  border-bottom: 1px solid rgb(177, 40, 40);
  border-top: 0px;
  border-left: 0px;
  border-right: 0px;
  outline: none;
  width: 80%;
  height: 40px;
  font-size: 25px;
  margin: 10px;
  font-family: 微软雅黑;
}
</style>


