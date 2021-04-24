<template>
  <div id="playArea">
    <div id="left">
      <div id="FlashcardHint"></div>
      <input type="text" id="answerInput"/>
    </div>
    <div id="right">
        <div id="timer">

        </div>
        <div id="log">

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
    methods: {
      checkAnswer(userInput, key){
        for(let i=0; i<answers.length; i++){
          if(answers[i].key == key){
            if(userInput == answers[i].val){
              //add points to user score and render a "correct" to screen
              return true; //change card
            }
          }
        }
        return false;
      }
    }
  }
</script>
