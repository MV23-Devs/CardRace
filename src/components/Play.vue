<template>
  <div id="playArea">
    <div id="left">
      <div id="FlashcardHint"></div>
      <form id="" v-on:submit="answerSubmitHandler">
        <label> Check Answers </label>
        <input type="text" id="answerInput" v-model="answerInput"/>
        <input type="submit" id="submit"/>
      </form>
    </div>
    <div id="right">
        <div id="timer">
          <button v-on:click="sortScoreboard">Sort Scoreboard</button>
        </div>
        <div id="log">
          a
        </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Play',
    props: {
      answers: Array,
    },
    data() {
      return {
        answerInput: "",
      }
    },
    methods: {
      answerSubmitHandler(){
        //make firebase call to get answers
        let answers = [{key: "jacob", val: "monke"}];
        let flashcardKey = "jacob";
        //console.log("lesgo");
        this.checkAnswer(this.answerInput, flashcardKey, answers)
      },
      checkAnswer(userInput, key, answers){
        for(let i=0; i<answers.length; i++){
          if(answers[i].key == key){
            if(userInput == answers[i].val){
              //add points to user score and render a "correct" to screen
              //console.log("true")
              return true; //change card
            }else{
              //console.log("false")
              return false;
            }
          }
        }
      },
      //takes in an array of objects with username and score
      sortScoreboard(scores) {
        scores = [{name: "Jason", score: 500}, {name: "Saarang", score: 1000}, {name: "Jacob", score: 100}, {name: "Atli", score: 0}];
        for (let i = 0; i < scores.length; i++) {
          for (let j = 0; j < scores.length - 1; j++) {
            if (scores[j].score < scores[j + 1].score) {
                let tmp = scores[j];
                scores[j] = scores[j + 1];
                scores[j + 1] = tmp;
            }
          }
        }
        console.log(scores);
        return scores;
      }
    }
  }
</script>
<style src="../assets/css/Play.css">
</style>