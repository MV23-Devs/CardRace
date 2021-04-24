
<template>
  <div id="VideoPage">
    <VideoChat id="vidChat" msg="Flash Study" />

    <div id="chooseCollection">
      <h3>Choose Collection to Submit</h3>
      <select id="DropdownMenu" v-model="current" @change.prevent="opened">
        <option
          id="DropdownOptions"
          v-for="item in collections"
          :key="item.name"
        >
          {{ item.name }}
        </option>
      </select>
    </div>

    <div id="notVideo">
      <!-- mute -->
      <v-btn id="muteButton" class="iconButtons" v-if="micOn" v-on:click="mute"
        ><img src="../assets/microphone.png" width="24" height="24"
      /></v-btn>
      <v-btn id="muteButton" class="iconButtons" v-else v-on:click="mute"
        ><img src="../assets/microphone-off.png" width="24" height="24"
      /></v-btn>
      <!-- video  -->
      <v-btn
        id="cameraButton"
        class="iconButtons"
        v-if="camOn"
        v-on:click="cameraFlip"
        ><img src="../assets/camera.png" width="24" height="24"
      /></v-btn>
      <v-btn
        id="cameraButton"
        class="iconButtons"
        v-else
        v-on:click="cameraFlip"
        ><img src="../assets/camera-off.png" width="24" height="24"
      /></v-btn>
      <h2>Current FlashCard</h2>
      <!-- <Flashcard class="stackedElement" /> -->
      <hr id="spacedHr" />
      <h2>Guesses:</h2>
      <ul
        v-for="item in userInputs"
        :key="(Math.random() + 1).toString() + userInput.indexOf(item)"
        style="list-style-type: none"
      >
        <li>{{ item }}</li>
      </ul>
      <form @submit.prevent="checkAnswer" id="answerForm">
        <label>Enter Answer Here:</label>
        <input
          type="text"
          class="inputField"
          v-on:input="userInput = $event.target.value"
        />
        <br />
        <button id="submitBtn">Check Answer!</button>
      </form>
      <table id="scoreTable">
        <thead>
          <tr>
            <th>Player name</th>
            <th>Player points</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in players" :key="players.indexOf(item)">
            <td>{{ item.email }}</td>
            <td>{{ item.points }}</td>
          </tr>
        </tbody>
      </table>

      <ul>
        <li v-for="card in cards" :key="card.key">
          {{ card.key }} | {{ card.val }}
        </li>
      </ul>

      <button id="shuffleBtn" @click="shuffle">Shuffle</button>
    </div>
  </div>
</template>


<script>
import VideoChat from "../components/VideoChat.vue";


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
      cards: [],
      key: "",
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
      players: []
    };
  },
  methods: {
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
  },
};
</script>