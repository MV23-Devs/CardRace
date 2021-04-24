<template>
  <div class="home">
    <Call> </Call>
  </div>
  <!-- <div id="notVideo">  -->

  <!-- </div> -->
</template>

<script>
// @ is an alias to /src
import Call from '@/components/Call.vue'

export default {
  name: 'Home',
  components: {
    Call
  },

  data() {
    return {

    }
  }, 
  methods: {
    showNotVideo() {
        document.getElementById("notVideo").classList.add("show");
    }
}

  
}


</script>