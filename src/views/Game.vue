<template>
  <div class="home">
    <VideoPage> </VideoPage>



  </div>
  <!-- <div id="notVideo">  -->

  <!-- </div> -->
</template>

<script>
import VideoPage from '@/views/VideoPage.vue';
// @ is an alias to /src
// import Call from '@/components/Call.vue'
// import Play from '@/components/Play.vue'

export default {
  name: 'Home',
  components: {
    // Call
    VideoPage
  },

  data() {
    return {

    }
  }, 
  methods: {
    // showNotVideo() { 
    //     document.getElementById("notVideo").classList.add("show");
    // }
}

  
}


</script>