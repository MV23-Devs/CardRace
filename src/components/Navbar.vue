<template>
  <div id="top">
    <div id="titleArea">
      <h1>
        CardRace
        <!-- should be logo image soon -->
      </h1>
    </div>
    <div id="navbar">
      <button class="navbarBtn">About</button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Navbar',
  props: {
    showHome:Boolean
  }
}
</script>


<style src="../assets/css/Navbar.css">
</style>
