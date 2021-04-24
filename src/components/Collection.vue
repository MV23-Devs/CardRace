<template>
  <div id="main">
    <router-link to="/create">Create Collection</router-link> |

    <h4>
      Every Collection that is created is public, do not put private or any
      sensitve info here
    </h4>

    <h1>Public Collection:</h1>

    <ul>
      <li v-for="item in collections" :key="item.title">
        {{ item.title }}
        <ul>
          <li v-for="card in item.cards" :key="card.key">
            {{ card.key }} | {{ card.val }}
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import { firebase } from "@firebase/app";
import "firebase/auth";

export default {
  mounted() {
    this.load();
  },
  data() {
    return {
      collections: [],
      key: "",
      val: "",
      name: "",
      current: "",
      open: false,
    };
  },
  methods: {
    opened() {
      this.open = true;
      this.load();
    },
    async load() {
      firebase
        .firestore()
        .collection("collections")
        .onSnapshot((ref) => {
          ref.docChanges().forEach((change) => {
            const { newIndex, oldIndex, doc, type } = change;
            let temp = {
              title: doc.data().title,
              cards: [],
            };

            firebase
              .firestore()
              .collection("collections")
              .doc(doc.data().title)
              .collection("cards")
              .onSnapshot((ref) => {
                ref.docChanges().forEach((change) => {
                  const { newIndex, oldIndex, doc, type } = change;
                  if (type === "added") {
                    temp.cards.push({
                      key: doc.data().key,
                      val: doc.data().val,
                    });
                  } else if (type === "modified") {
                    temp.cards.splice(oldIndex, 1);
                    temp.cards.splice(
                      newIndex,
                      0,
                      this.temp.cards.push({
                        key: doc.data().key,
                        val: doc.data().val,
                      })
                    );
                  } else if (type === "removed") {
                    temp.cards.splice(oldIndex, 1);
                  }
                });
              });
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
  },
};
</script>


<style scoped src="../assets/css/Join.css">
</style>