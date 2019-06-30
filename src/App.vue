<template>
  <div id="app">
    <createvote></createvote>
  </div>
</template>

<script>
import createvote from "./components/createvote";
export default {
  name: "App",
  components: {
    createvote
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
.router-link {
  margin-left: 100px;
  display: inline;
}
h1 {
  font-size: 80px;
}
</style>
