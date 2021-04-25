<template>
  <div class="home">
    <Call/>
    <Play/>
  </div>
  <!-- <div id="notVideo">  -->

  <!-- </div> -->
</template>

<script>
// @ is an alias to /src
import Call from '@/components/Call.vue'
import Play from '@/components/Play.vue'

export default {
  name: 'Home',
  components: {
    Call,
    Play
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