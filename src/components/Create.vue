<template>
  <div id="main">
    <h4>
      Every Collection that is created is public, do not put private or any
      sensitve info here
    </h4>

    <form @submit.prevent="pressed2">
      <div class="name">
        <input
          class="inputField"
          type="text"
          v-model="title"
          placeholder="Collection Name:"
        />
      </div>
      <button class="submitBtn" type="submit">Create</button>
    </form>

    <h3 id="addCards">Add Cards</h3>
    <form @submit.prevent="pressed">
      <div class="key">
        <label>Term: </label>
        <input
          id="term"
          type="text"
          class="inputField"
          v-model="key"
          placeholder="Term"
        />
      </div>
      <div class="val">
        <label>Answer:</label>
        <input
          type="text"
          class="inputField"
          v-model="val"
          placeholder="Answer"
        />
      </div>
      <button class="submitBtn" type="submit">Add Cards</button>
    </form>
  </div>
</template>

<script>
import { firebase } from "@firebase/app";

export default {
  data() {
    return {
      collections: [],
      cards: [],
      title: "",
      key: "",
      val: "",
    };
  },
  methods: {
    async pressed() {
      try {
        await firebase
          .firestore()
          .collection("collections")
          .doc(this.title)
          .collection("cards")
          .doc(this.key)
          .set({
            key: this.key,
            val: this.val,
          });
      } catch (err) {
        console.log(err);
      }
    },
    async pressed2() {
      try {
        await firebase
          .firestore()
          .collection("collections")
          .doc(this.title)
          .set({
            title: this.title,
          });
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style scoped src="../assets/css/Join.css">
</style>