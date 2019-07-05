<template>
  <div id="app">
    <headele></headele>
    <el-card class="box-card">
      <p
        style="font-size: 40px; font-family: 微软雅黑;text-align: left; margin-left: 10%; width: 80%"
      >{{vote.title}}</p>
      <div>
        <p
          v-if="HaveVoted"
          style="font-family: 微软雅黑; text-align: left;margin-left: 10%; color:red ; width: 120px;float: left"
        >已投过票</p>
        <p
          v-else
          style="font-family: 微软雅黑; text-align: left; margin-left: 10%; color:red; width: 130px ;float: left"
        >最多可选择{{vote.limit}}项</p>
        <p style="font-family: 微软雅黑; text-align: left; width:120px;float: left">共有{{vote.count}}人投票</p>
      </div>
      <br>
      <br>
      <br>
      <voteoption
        v-for="(item, index) in vote.optionList"
        :key="index"
        v-bind:item="item"
        v-bind:type="type"
        v-bind:index="index"
        @gets="getradiovalue"
        v-bind:isdisabled="disabled"
        :optionHaveVoted="optionHaveVoted"
      ></voteoption>
      <p style="font-family: 微软雅黑; text-align: left; margin-left: 10%;">
        <el-button type="primary" style="width:200px" @click="voting">投票</el-button>
      </p>
      <p class="blank"></p>
    </el-card>
  </div>
</template>
<script>
import voteoption from "./voteoption";
import headele from "./headele"
import axios from "axios";

export default {
  name: "showvote",
  props: ["id"],
  components: {
    voteoption, headele
  },
  data() {
    return {
      vote: {
        title: "",
        limit: 1,
        count: 0,
        optionList: []
      },
      selectid: [],
      disabled: [],
      type: "radio",
      HaveVoted: false,
      thisIpvoted: [],
      optionHaveVoted: []
    };
  },
  methods: {
    // 处理选满了之后灰掉的判断
    getradiovalue(id) {
      if (!this.HaveVoted) {
        if (this.vote.limit > 1) {
          // 记录选择了哪些id
          if (this.selectid.indexOf(id) > -1) {
            this.selectid.splice(this.selectid.indexOf(id), 1);
          } else {
            this.selectid.push(id);
          }
          // 处理不能再选
          if (this.selectid.length === this.vote.limit) {
            for (let i = 0; i < this.vote.optionList.length; i++) {
              if (this.selectid.indexOf(this.vote.optionList[i].id + "") > -1) {
                this.disabled.push(false);
              } else {
                this.disabled.push(true);
              }
            }
          }
          // 处理点掉可以再选
          if (this.selectid.length === this.vote.limit - 1) {
            this.disabled = [];
          }
        } else {
          // 处理radio的选择id
          this.selectid = ["0"];
          this.selectid[0] = id;
        }
      }
    },
    voting() {
      if (this.HaveVoted) {
        alert("已经投过票");
      } else {
        // 构造传回后端的数据：对象数组，包含userId、userIp、选中的optionId
      let data = [];
      // data.pollId = Number.parseInt(this.id);
      let userInfo = window.localStorage.getItem("userInfo")
      
      for (const id of this.selectid) {
        // let pollId = Number.parseInt(this.id);
        // let optionId = Number.parseInt(id);
        let next = {
          pollId: Number.parseInt(this.id),
          optionId: Number.parseInt(id),
          userId: userInfo === null ? 0 : JSON.parse(userInfo).userId
        };   
        data.push(next);
      }
      axios.post("http://127.0.0.1:8081/poll/voting", data,{headers:{Authorization: window.localStorage.getItem("token")}}).then(res => {
        this.initProps(res);
      });
      }
    },
    // 接受到的数据初始化vue的data
    initProps(res) {
      this.vote = res.data.list[0];
      let optionVoted = [];
      if (res.data.list[1].length !== 0) {
        this.HaveVoted = true;
        for (const ipvoted of res.data.list[1]) {
          optionVoted.push(ipvoted.optionId);
        }
        this.disabled = [];
        for (const option of this.vote.optionList) {
          this.disabled.push(true);
          if (optionVoted.indexOf(option.id) <= -1) {
            this.optionHaveVoted.push(false);
          } else {
            this.optionHaveVoted.push(true);
          }
        }
      }
      if (this.vote.limit > 1) {
        this.type = "checkbox";
      }
    }
  },
  created() {
    axios.get("http://127.0.0.1:8081/poll/get/" + this.id, {headers:{Authorization: window.localStorage.getItem("token")}}).then(res => {
      this.initProps(res);
    });
  }
};
</script>
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
h1 {
  font-size: 80px;
}
.box-card {
  width: 40%;
  margin-left: 30%;
}
.blank {
  height: 10px;
}
</style>

