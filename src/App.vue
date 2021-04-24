<template>
  <div id="app">
    <Navbar />
    <Join/>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import Navbar from "./components/Navbar.vue";
import Join from "./components/Join.vue";

export default {
  name: "App",
  components: {
    Navbar,
    Join,
  },
};

</script>

<style src="./assets/css/App.css">
</style>
