<template>
  <div id="playArea">
    <div id="left">
      <div id="FlashcardHint"></div>
      <form id="" v-on:submit="answerSubmitHandler">
        <label> Check Answers </label>
        <input type="text" id="answerInput" v-model="answerInput" />
        <input type="submit" id="submit" />
      </form>
    </div>
    <div id="right">
      <div id="timer">
        <button v-on:click="sortScoreboard">Sort Scoreboard</button>
      </div>
      <div id="log">a</div>
    </div>
  </div>
</template>

<script>
// import firebase from "firebase";

export default {
  name: "Play",
  props: {
    answers: Array,
  },
  data() {
    return {
      
    };
  },
  methods: {
  },
};
</script>
<style src="../assets/css/Play.css">
</style>