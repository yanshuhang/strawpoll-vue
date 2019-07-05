<template>
  <div id="app">
    <headele></headele>
    <el-tabs type="border-card">
      <el-tab-pane label="创建的投票">
        <el-table :data="createdPoll" stripe style="width: 100%">
          <el-table-column prop="title" label="投票主题" width="220"></el-table-column>
          <el-table-column prop="count" label="投票人数" width="160"></el-table-column>
          <el-table-column prop="createdTime" label="创建时间"></el-table-column>
          <el-table-column fixed="right" label="操作" width="120">
            <template slot-scope="scope">
              <el-button @click="topoll(scope.row.id)" type="text" size="small">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
        <br>
        <el-pagination background layout="prev, pager, next" :total="createdPollSize" :page-size="8" @current-change="changePage1"></el-pagination>
      </el-tab-pane>
      <el-tab-pane label="参与的投票">
        <el-table :data="votedPoll" stripe style="width: 100%">
          <el-table-column prop="title" label="投票主题" width="220"></el-table-column>
          <el-table-column prop="count" label="投票人数" width="160"></el-table-column>
          <el-table-column prop="voteTime" label="投票时间"></el-table-column>
          <el-table-column fixed="right" label="操作" width="120">
            <template slot-scope="scope">
              <el-button @click="topoll(scope.row.id)" type="text" size="small">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
        <br>
        <el-pagination background layout="prev, pager, next" :total="votedPollSize" :page-size="8" @current-change="changePage2"></el-pagination>
      </el-tab-pane>
    </el-tabs>
    
  </div>
</template>
<script>
import headele from "./headele";
import axios from "axios";

export default {
  name: "userHome",
  components: { headele },
  data() {
    return {
      createdPoll: [],
      votedPoll: [],
      createdPollSize: 0,
      votedPollSize: 0,
    };
  },
  methods: {
    topoll(id) {
      this.$router.push("/" + id);
    },
    showVotedPoll() {
      alert("hhhhh");
    },
    changePage1(val){
      axios
      .get("http://127.0.0.1:8081/user/poll/" + val, {
        headers: { Authorization: window.localStorage.getItem("token") }
      })
      .then(res => {
        
        this.createdPoll = res.data.list[0].list;
        this.createdPollSize = res.data.list[0].total
        for (const poll of this.createdPoll) {
          poll.createdTime = poll.createdTime.replace('T',' ')
        }
      });
    },
    changePage2(val){
      axios
      .get("http://127.0.0.1:8081/user/poll/" + val, {
        headers: { Authorization: window.localStorage.getItem("token") }
      })
      .then(res => {
        this.votedPoll = res.data.list[1].list;
        this.votedPollSize = res.data.list[1].total
        for (const poll of this.votedPoll) {
          poll.voteTime = poll.voteTime.replace('T',' ')
        }
      });
    }
  },
  created() {
    axios
      .get("http://127.0.0.1:8081/user/poll/1", {
        headers: { Authorization: window.localStorage.getItem("token") }
      })
      .then(res => {
        this.createdPoll = res.data.list[0].list;
        this.votedPoll = res.data.list[1].list;
        this.createdPollSize = res.data.list[0].total
        this.votedPollSize = res.data.list[1].total
        for (const poll of this.createdPoll) {
          poll.createdTime = poll.createdTime.replace('T',' ')
        }
        for (const poll of this.votedPoll) {
          poll.voteTime = poll.voteTime.replace('T',' ')
        }
      });
  }
};
</script>
<style>
#app {
  font-family: 微软雅黑;
  text-align: center;
  margin-top: 60px;
}
.el-tabs {
  margin: auto;
  width: 800px;
}
.el-pagination{
  margin: 10px;
}
</style>


