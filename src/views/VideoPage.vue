
<template>
  <div id="VideoPage">
    <VideoChat id="vidChat" @changeUsername="changeUsername($event)" />

    <div id="playArea">
      <div id="left">
        <div id="FlashcardHint">
          {{ val }}
        </div>
        <form id="" v-on:submit.prevent="answerSubmitHandler">
          <!-- <label> Check Answers </label> -->
          <input
            type="text"
            id="answerInput"
            placeholder="Answer Here"
            v-model="answerInput"
          />
          <input type="submit" id="submit" class="submit" />
        </form>
      </div>
      <div id="right">
        <div id="timer">
          <h3>Leaderboard</h3>
          <ul>
            <li
              v-for="item in sortScoreboard(scores)"
              v-bind:key="(item.name, item.points)"
            >
              <p>{{ item.name }}: {{ item.points }}</p>
            </li>
          </ul>
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
      <button v-on:click="submitCards" class="submit">Submit</button>
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
      val: "",
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
      scores: [],
    };
  },
  created() {
    firebase
      .firestore()
      .collection("meetings")
      .doc("please")
      .collection("users")
      .onSnapshot((querySnapshot) => {
        let storeScores = [];
        querySnapshot.forEach((doc) => {
          //update stuff
          storeScores.push(doc.data());
        });
        this.scores = storeScores;
      });
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

      let host = false;
      firebase
        .firestore()
        .collection("meetings")
        .doc("please")
        .collection("users")
        .doc(this.user)
        .get()
        .then((doc) => {
          host = doc.data().host;
          console.log("host", host);
        })
        .then(() => {
          if (host) {
            document.getElementById("host-controls").classList.add("show");
          }
        });
    },

    submitCards() {
      let host = false;

      firebase
        .firestore()
        .collection("meetings")
        .doc("please")
        .collection("users")
        .doc(this.user)
        .get()
        .then((doc) => {
          host = doc.data().host;
        });

      console.log(host);

      document.getElementById("host-controls").classList.add("hidden");
      console.log("Hello");

      // firebase.firestore().collection("collections").doc(this.selection).get().then(doc => {
      //   console.log(doc.data())
      // })

      firebase
        .firestore()
        .collection("meetings")
        .doc("please")
        .collection("cards")
        .get()
        .then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            firebase
              .firestore()
              .collection("meetings")
              .doc("please")
              .collection("cards")
              .doc(doc.data().key)
              .delete();
          });
        });

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
        })
        .then(() => {
          firebase.firestore().collection("meetings").doc("please").set({
            active: true,
          });
        })
        .then(() => {
          this.setup();
        });
    },

    setup() {
      firebase
        .firestore()
        .collection("meetings")
        .doc("please")
        .collection("cards")
        .get()
        .then((snapshot) => {
          snapshot.docs.map((doc) => {
            this.cards.push({ key: doc.data().key, val: doc.data().val });
          });
        });

      for (var i = this.cards.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = this.cards[i];
        this.cards[i] = this.cards[j];
        this.cards[j] = temp;
      }

      this.val = this.cards[0].val;
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
      // let answers = [];
      // let collectionName = "Countries";

      // firebase
      //   .firestore()
      //   .collection("collections")
      //   .doc(collectionName)
      //   .collection("cards")
      //   .get()
      //   .then((querySnapshot) => {
      //     querySnapshot.forEach((doc) => {
      //       answers.push(doc.data());
      //     });
      //   });
      // console.log("answers", answers);
      // this.guesses.push(this.answerInput);

      // //console.log("lesgo");
      // let correct = this.checkAnswer(this.answerInput);
      // if (correct) {
      //   this.guesses.push("GUESS CORRECT!");
      // }
      this.checkAnswer(this.answerInput);
      let answers = [];
      let collectionName = "Countries";

      firebase
        .firestore()
        .collection("collections")
        .doc(collectionName)
        .collection("cards")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            answers.push(doc.data());
          });
        });
      console.log("answers", answers);
      this.guesses.push(this.answerInput);

      //console.log("lesgo");
      let correct = this.checkAnswer(this.answerInput);
      if (correct) {
        this.guesses.push("CORRECT GUESS!");
      }
    },
    checkAnswer(userInput) {
      // let response = false;

      if (userInput == this.cards[0].key) {
        console.log("Correct");
      }
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
    },
  },
};
</script>

<style src="../assets/css/Play.css">
</style>