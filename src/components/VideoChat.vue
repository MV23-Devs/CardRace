<template>
  <div class="hello">
    <div class="agora-title-box">
      <div class="agora-title">Card-Race</div>
    </div>
    <div class="agora-box">
      <!-- <div class="agora-input">
        <div class="agora-text">* Appid</div>
        <el-input
          v-model="option.appid"
          placeholder="Appid"
          clearable
        ></el-input>
      </div>
      <div class="agora-input">
        <div class="agora-text">Token</div>
        <el-input
          v-model="option.token"
          placeholder="Token"
          clearable
        ></el-input>
      </div> -->
      <div class="agora-input">
        <div class="agora-text">* Channel Name</div>
        <el-input
          v-model="option.channel"
          placeholder="Channel Name"
          clearable
        ></el-input>
      </div>
      <div class="agora-input">
        <div class="agora-text">* User Name</div>
        <el-input v-model="user" placeholder="User Name" clearable></el-input>
      </div>
      <div class="agora-button">
        <el-button type="primary" @click="joinEvent" :disabled="disableJoin"
          >join</el-button
        >
        <el-button
          type="primary"
          @click.prevent="leaveEvent"
          plain
          :disabled="!disableJoin"
          >leave</el-button
        >
      </div>
    </div>
    <div class="agora-view">
      <div class="agora-video">
        <StreamPlayer
          :stream="localStream"
          :domId="localStream.getId()"
          v-if="localStream"
        ></StreamPlayer>
      </div>
      <div
        class="agora-video"
        :key="index"
        v-for="(remoteStream, index) in remoteStreams"
      >
        <StreamPlayer
          :stream="remoteStream"
          :domId="remoteStream.getId()"
        ></StreamPlayer>
      </div>
    </div>
    <div id="backup-leave">
      <el-button
        type="primary"
        @click="leaveEvent"
        plain
        :disabled="!disableJoin"
      >
        leave
      </el-button>
    </div>
  </div>
</template>

<script>
import RTCClient from "../agora-rtc-client";
import StreamPlayer from "./stream-player";
import { log } from "../utils/utils";

import firebase from "firebase";

export default {
  components: {
    StreamPlayer,
  },
  data() {
    return {
      option: {
        appid: "26c0545d6d7e45fea86e2ba4fbf2cfad",
        token:
          "00626c0545d6d7e45fea86e2ba4fbf2cfadIACLawglJOUCaowxtx2n/nXYaf6f2XoUgmzwITzfYYHUOOovBZoAAAAAEABbpyVNiraFYAEAAQCKtoVg",
        uid: null,
        channel: "please",
      },
      disableJoin: false,
      localStream: null,
      remoteStreams: [],
      user: "",
    };
  },
  props: {
    msg: String,
  },

  methods: {
    joinEvent() {
      if (!this.option.appid) {
        this.judge("Appid");
        return;
      }
      if (!this.option.channel) {
        this.judge("Channel Name");
        return;
      }
      this.rtc
        .joinChannel(this.option)
        .then(() => {
          let size = 0;

          firebase
            .firestore()
            .collection("meetings")
            .doc(this.option.channel)
            .collection("users")
            .get()
            .then((snap) => {
              size = snap.size; // will return the collection size
            })
            .then(() => {
              if (size == 0) {
                firebase
                  .firestore()
                  .collection("meetings")
                  .doc(this.option.channel)
                  .collection("users")
                  .doc(this.user)
                  .set({
                    name: this.user,
                    points: 0,
                    host: true,
                  });
              } else {
                firebase
                  .firestore()
                  .collection("meetings")
                  .doc(this.option.channel)
                  .collection("users")
                  .doc(this.user)
                  .set({
                    name: this.user,
                    points: 0,
                    host: false,
                  });
              }
            });
          document.getElementById("playArea").classList.add("playVisible");
          if (size == 0) {
            firebase
              .firestore()
              .collection("meetings")
              .doc(this.option.channel)
              .collection("users")
              .doc(this.user)
              .set({
                name: this.user,
                points: 0,
                host: true,
              });
          } else {
            firebase
              .firestore()
              .collection("meetings")
              .doc(this.option.channel)
              .collection("users")
              .doc(this.user)
              .set({
                name: this.user,
                points: 0,
                host: false,
              });
          }

          this.$emit("changeUsername", this.user);

          this.$message({
            message: "Join Success",
            type: "success",
          });
          this.rtc
            .publishStream()
            .then((stream) => {
              this.$message({
                message: "Publish Success",
                type: "success",
              });
              this.localStream = stream;
            })
            .catch((err) => {
              this.$message.error("Publish Failure");
              log("publish local error", err);
            });
          document
            .getElementsByClassName("agora-box")[0]
            .classList.add("hidden");
          document.getElementById("backup-leave").classList.add("show");
          console.error("yeet");
        })
        .catch((err) => {
          this.$message.error("Join Failure");
          log("join channel error", err);
        });
      this.disableJoin = true;
    },
    leaveEvent() {
      this.disableJoin = false;
      this.rtc
        .leaveChannel()
        .then(() => {
          console.log(this.user);
          firebase
            .firestore()
            .collection("meetings")
            .doc(this.option.channel)
            .collection("users")
            .doc(this.user)
            .delete();
          this.$message({
            message: "Leave Success",
            type: "success",
          });
        })
        .catch((err) => {
          this.$message.error("Leave Failure");
          log("leave error", err);
        });
      this.localStream = null;
      this.remoteStreams = [];
      document.location.href = "/";
    },
    judge(detail) {
      this.$notify({
        title: "Notice",
        message: `Please enter the ${detail}`,
        position: "top-left",
        type: "warning",
      });
    },
  },
  created() {
    this.rtc = new RTCClient();
    let rtc = this.rtc;
    rtc.on("stream-added", (evt) => {
      let { stream } = evt;
      log("[agora] [stream-added] stream-added", stream.getId());
      rtc.client.subscribe(stream);
    });

    rtc.on("stream-subscribed", (evt) => {
      let { stream } = evt;
      log("[agora] [stream-subscribed] stream-added", stream.getId());
      if (!this.remoteStreams.find((it) => it.getId() === stream.getId())) {
        this.remoteStreams.push(stream);
      }
    });

    rtc.on("stream-removed", (evt) => {
      let { stream } = evt;
      log("[agora] [stream-removed] stream-removed", stream.getId());
      this.remoteStreams = this.remoteStreams.filter(
        (it) => it.getId() !== stream.getId()
      );
    });

    rtc.on("peer-online", (evt) => {
      this.$message(`Peer ${evt.uid} is online`);
    });

    rtc.on("peer-leave", (evt) => {
      this.$message(`Peer ${evt.uid} already leave`);
      this.remoteStreams = this.remoteStreams.filter(
        (it) => it.getId() !== evt.uid
      );
    });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
.hello {
  margin: auto;
}
.hidden {
  display: none;
  height: 0px;
  overflow: hidden;
}
.agora-box {
  display: inline-block;
}
.agora-title {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 32px;
  font-weight: bold;
  text-align: center;
  color: #2c3e50;
}
.agora-view {
  display: flex;
  flex-wrap: wrap;
}
.agora-video {
  margin: 10px;
}
.agora-video-player {
}

.agora-input {
  margin: 20px;
  width: 320px;
}
.agora-text {
  margin: 5px;
  font-size: 16px;
  font-weight: bold;
}
.agora-button {
  display: flex;
  width: 160px;
  justify-content: space-between;
  margin: 20px;
}
.agora-video {
  width: 320px;
  height: 240px;
}

.iconButtons {
  background-color: #00000000;
  border: none;
}
div[role="alert"] {
  display: none;
}

#notVideo {
  height: 50px;
  width: 100%;
  align-items: center;
  /* background-color: #999; */
  position: absolute;
  border-top: 1px solid black;
  padding-top: 15px;
  bottom: 5px;
}

.playVisible {
  display: inline-flex;
}
</style>
