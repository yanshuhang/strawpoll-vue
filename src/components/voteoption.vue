<template>
  <div class="main">
    <div class="radio-left">
      <input
        :type="type"
        :disabled="isdisabled[index]"
        name="checkbox"
        :checked="optionHaveVoted[index]"
        :value="item.id"
        @change="check($event.target.value)"
      >
      <label style="font-family: 微软雅黑">{{item.title}}</label>
    </div>
    <div class="option-count" style="font-family: 微软雅黑">{{item.count}}票</div>
  </div>
</template>
<script>
export default {
  name: "voteoption",
  props: ["item", "isdisabled", "index", "type","optionHaveVoted"],
  data() {
    return {
      value: ""
    };
  },
  methods: {
    check(id) {
      this.$emit("gets", id);
    }
  }
};
</script>
<style>
.main {
  width: 100%;
  height: 40px;
  margin-left: 10%;
}
.radio-left {
  text-align: left;
  width: 50%;
  float: left;
}
.option-count {
  text-align: right;
  width: 10%;
  float: left;
}
</style>


