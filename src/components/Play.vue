<template>
  <div id="playArea">
    <div id="left">
      <div id="FlashcardHint"></div>
      <form id="" v-on:submit.prevent="answerSubmitHandler">
        <label> Check Answers </label>
        <input type="text" id="answerInput" v-model="answerInput" />
        <input type="submit" id="submit" />
      </form>
    </div>
    <div id="right">
      <div id="timer">a</div>
      <div id="log">a</div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase"

export default {
  name: "Play",
  props: {
    answers: Array,
  },
  data() {
    return {
      answerInput: "",
      collection: "",
      key: "",
    };
  },
  methods: {
    answerSubmitHandler() {
      //make firebase call to get answers
      let flashcardKey = "Russia";
      //console.log("lesgo");
      this.checkAnswer(this.answerInput, "Test", flashcardKey);
    },
    checkAnswer(userInput, collection, key) {

      // let response = false;
      
      firebase.firestore().collection("collections").doc(collection).collection("cards").doc(key).get().then(doc => {
        console.log(doc.data().val == this.answerInput)
      });


    },
  },
};
</script>
<style src="../assets/css/Play.css">
</style>