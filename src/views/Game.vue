<template>
  <div class="home">
    <VideoPage id="callStuff" />
    <!-- <Play id="cards" /> -->
  </div>
  <!-- <div id="notVideo">  -->

  <!-- </div> -->
</template>

<script>
import VideoPage from "@/views/VideoPage.vue";
// @ is an alias to /src
// import Call from '@/components/Call.vue'
// import Play from "@/components/Play.vue";

export default {
  name: "Home",
  components: {
    // Call
    VideoPage,
    // Play,
  },

  data() {
    return {};
  },
  methods: {
    // showNotVideo() {
    //     document.getElementById("notVideo").classList.add("show");
    // }
  },
};
</script>

<style scoped>
.home {
  display: flex;
}
/* #callStuff {
  width: 30% !important;
  display: inline-block;
} */
#cards {
  width: 70% !important;
  display: inline-block;

}
</style>