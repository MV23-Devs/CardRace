<template>
  <div id="playArea">
    <div id="left">
      <div id="FlashcardHint"></div>
      <form id="form" v-on:submit="answerSubmitHandler">
        <!-- <label> Check Answers </label> -->
        <input
          type="text"
          placeholder="Answer Here"
          id="answerInput"
          v-model="answerInput"
        />
        <input type="submit" id="submit" />
      </form>
    </div>
    <div id="right">
      <div id="timer">
        <p>thing</p>
        <button v-on:click="sortScoreboard">Sort Scoreboard</button>
        <ul>
          <li v-for="item in sortScoreboard(scores)" v-bind:key="(item.name, item.score)">
            <p>{{item.name}}: {{item.points}}</p>
          </li>
        </ul>
      </div>
      
      <div id="log">
        <p>log</p>
      </div>
    </div>
  </div>
</template>

<script>
import { firebase } from "@firebase/app";
import "firebase/auth";

export default {
  name: "Play",
  props: {
    answers: Array,
  },
  data() {
    return {
      answerInput: "",
      scores: [],
    };
  },
  created() {
    firebase.firestore().collection("meetings").doc("please").collection("users").get().then((querySnapshot) => {
      let storeScores = [];
      querySnapshot.forEach((doc) => {
        storeScores.push(doc.data());
      })
      console.log(storeScores);
      this.scores = storeScores;
    })
  },
  methods: {
    answerSubmitHandler() {
      //make firebase call to get answers
      let answers = [{ key: "jacob", val: "monke" }];
      let flashcardKey = "jacob";
      //console.log("lesgo");
      this.checkAnswer(this.answerInput, flashcardKey, answers);
    },
    checkAnswer(userInput, key, answers) {
      for (let i = 0; i < answers.length; i++) {
        if (answers[i].key == key) {
          if (userInput == answers[i].val) {
            //add points to user score and render a "correct" to screen
            //console.log("true")
            return true; //change card
          } else {
            //console.log("false")
            return false;
          }
        }
      }
    },
    sortScoreboard(scores) {
      for (let i = 0; i < scores.length; i++) {
        for (let j = 0; j < scores.length - 1; j++) {
          if (scores[j].points < scores[j + 1].points) {
              let tmp = scores[j];
              scores[j] = scores[j + 1];
              scores[j + 1] = tmp;
          }
        }
      }
      console.log(scores);
      return scores;
    }
  },
};
</script>
<style src="../assets/css/Play.css">
</style>