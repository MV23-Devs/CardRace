
<template>
  <div id="VideoPage">
    <VideoChat id="vidChat" @changeUsername="changeUsername($event)" />

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
        <div id="timer">
          <button v-on:click="sortScoreboard">Sort Scoreboard</button>
        </div>
        <div id="log">a</div>
      </div>
    </div>

    <div id="host-controls">
      <h3>Choose Collection to Play With</h3>
      <select v-model="selection" id="dropdown">
        <option
          id="dropdown-option"
          v-for="item in collections"
          :key="item.title"
        >
          {{ item.title }}
        </option>
      </select>
      <button v-on:click="submitCards">Submit</button>
    </div>

    <div id="notVideo">
      <!-- mute -->
      <button
        id="muteButton"
        class="iconButtons"
        v-if="micOn"
        v-on:click="mute"
      >
        <img src="../assets/microphone.png" width="35" height="35" />
      </button>
      <button id="muteButton" class="iconButtons" v-else v-on:click="mute">
        <img src="../assets/microphone-off.png" width="35" height="35" />
      </button>
      <!-- video  -->
      <button
        id="cameraButton"
        class="iconButtons"
        v-if="camOn"
        v-on:click="cameraFlip"
      >
        <img src="../assets/camera.png" width="35" height="35" />
      </button>
      <button
        id="cameraButton"
        class="iconButtons"
        v-else
        v-on:click="cameraFlip"
      >
        <img src="../assets/camera-off.png" width="35" height="35" />
      </button>
    </div>
  </div>
</template>


<script>
import VideoChat from "../components/VideoChat.vue";
import firebase from "firebase";

export default {
  name: "App",
  components: {
    VideoChat,
  },

  mounted() {
    this.load();
    // if (firebase.auth().currentUser) {
    //   firebase
    //     .firestore()
    //     .collection("accounts")
    //     .doc(firebase.auth().currentUser.email)
    //     .collection("collections")
    //     .doc("Test")
    //     .collection("cards")
    //     .doc("test2")
    //     .get()
    //     .then((doc) => {
    //       console.log(doc.data());
    //       this.answer = doc.data().val;
    //       console.log(this.answer);
    //     });
    // }
  },

  data() {
    return {
      collections: [],
      selection: "",
      cards: [],
      val: "nigeria",
      name: "",
      current: "",
      ccurent: "",
      open: false,
      userInputs: [],
      answer: "",
      user: "",
      userInput: "",
      userPoints: 0,
      opponentPoints: 0,
      micOn: true,
      camOn: true,
      players: [],

      answerInput: "",
      collection: "",
      key: "",
      scores: [
        { name: "lesgo", score: 100 },
        { name: "pull up", score: -10000 },
        { name: "convertible", score: 12000 },
      ],
    };
  },
  methods: {
    load() {
      firebase
        .firestore()
        .collection("collections")
        .onSnapshot((ref) => {
          ref.docChanges().forEach((change) => {
            const { newIndex, oldIndex, doc, type } = change;
            let temp = {
              title: doc.data().title,
            };
            if (type === "added") {
              console.log(temp);
              this.collections.push(temp);
            } else if (type === "modified") {
              this.collections.splice(oldIndex, 1);
              this.collections.splice(newIndex, 0, temp);
            } else if (type === "removed") {
              this.collections.splice(oldIndex, 1);
            }
          });
        });
    },
    changeUsername(username) {
      this.user = username;
      console.log(this.user);
    },

    submitCards() {
      document.getElementById("host-controls").classList.add("hidden")
      console.log("Hello");

      // firebase.firestore().collection("collections").doc(this.selection).get().then(doc => {
      //   console.log(doc.data())
      // })

      firebase
        .firestore()
        .collection("collections")
        .doc(this.selection)
        .collection("cards")
        .get()
        .then((snapshot) => {
          snapshot.docs.map((doc) => {
            firebase
              .firestore()
              .collection("meetings")
              .doc("please")
              .collection("cards")
              .doc(doc.data().key)
              .set({
                key: doc.data().key,
                val: doc.data().val,
              });
          });
        });
    },

    mute() {
      console.log("Mute was called");
      // if (micOn) {
      //   localStreams.camera.stream.muteAudio();
      // } else {
      //   localStreams.camera.stream.unmuteAudio();
      // }
      this.micOn = !this.micOn;
    },
    cameraFlip() {
      console.log("cameraFlip was called");
      this.camOn = !this.camOn;
    },
    showNotVideo() {
      document.getElementById("notVideo").style.display = "inline-block";
    },

    answerSubmitHandler() {
      let answers = [];
      let flashcardKey = "jacob";
      let collectionName = "Countries"

      firebase.firestore().collection("collections").doc(collectionName).collection("cards").get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          answers.push(doc.data());
        })
      })
      console.log("answers", answers);
      this.guesses.push(this.answerInput);
      
      //console.log("lesgo");
      let correct = this.checkAnswer(this.answerInput, flashcardKey, answers);
      if(correct){
        this.guesses.push("GUESS CORRECT!");
      }
    },
    checkAnswer(userInput, collection, key) {
      // let response = false;

      firebase
        .firestore()
        .collection("collections")
        .doc(collection)
        .collection("cards")
        .doc(key)
        .get()
        .then((doc) => {
          if (doc.data().val == this.answerInput) {
            let score = 0;

            firebase
              .firestore()
              .collection("meetings")
              .doc("please")
              .collection("users")
              .doc(this.user)
              .get()
              .then((doc) => {
                score = doc.data().points;
                firebase
                  .firestore()
                  .collection("meetings")
                  .doc("please")
                  .collection("users")
                  .doc(this.user)
                  .set({
                    points: score + 5,
                  });
              });
          }
        });
    },
    sortScoreboard(scores) {
      scores = [
        { name: "Jason", score: 500 },
        { name: "Saarang", score: 1000 },
        { name: "Jacob", score: 100 },
        { name: "Atli", score: 0 },
      ];
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
    },
  },
};
</script>

<style src="../assets/css/Play.css">
</style>