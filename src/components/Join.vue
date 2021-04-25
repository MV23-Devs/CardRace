

<template>
  <div id="main">
    <!-- <button id="joinMeeting" @click="!isHidden">Join a meeting</button> -->
    <div id="popup" >
      <!-- <input type="text" id="input-code" placeholder="Meeting ID" /> -->
      <!-- <p>Message Here</p> -->
      <img src="@/assets/logo_size.png" alt="" width="100px" height="100px">
      <button v-on:click="goToVideoPage" id="joinBtn">Join</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Join',
  // props: {
  //     messages: {
  //         type: Array,
  //     },
  // },
  methods: {
      goToVideoPage() {
          this.$router.push("/Game")
      }
  }
}
</script>
<style scoped src="../assets/css/Join.css">
</style>