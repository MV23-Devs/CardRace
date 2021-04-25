
<template>
  <div id="VideoPage">
    <VideoChat id="vidChat" @changeUsername="changeUsername($event)" />

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
import firebase from "firebase"

export default {
  name: "App",
  components: {
    VideoChat,
  },

  mounted() {
    // this.load();
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
    };
  },
  methods: {
    changeUsername(username) {
      this.user = username;
      console.log(this.user);
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
      //make firebase call to get answers
      let flashcardKey = "Russia";
      //console.log("lesgo");
      this.checkAnswer(this.answerInput, "Test", flashcardKey);
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
          console.log(doc.data().val == this.answerInput);
        });
    },
  },
};
</script>