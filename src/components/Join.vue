<template>
  <div id="main">
    <button id="joinMeeting">Join a meeting</button>
    <div id="popup">
      <input type="text" id="input-code" placeholder="Meeting ID" />
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