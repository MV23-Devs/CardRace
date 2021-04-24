<template>
  <div class="hello">
    <div class="agora-title-box">
      <div class="agora-title">Card Racer</div>
    </div>
    <div class="agora-box" id="MainBox">
      <!-- <div class="agora-input">
        <div class="agora-text">* Appid</div>
        <el-input
          v-model="option.appid"
          placeholder="Appid"
          clearable
        ></el-input>
      </div> -->
      <div class="agora-input">
        <div class="agora-text">* Channel Name</div>
        <input
          v-model="option.channel"
          placeholder="Channel Name"
          clearable
         />
      </div>

      <div class="agora-button">
        <button
          type="primary"
          class="Buttons1"
          id="JoinBtn"
          @click="joinEvent"
          :disabled="disableJoin"
          >Join</button>
        <br />
        <!-- <el-button
          type="primary"
          @click="leaveEvent"
          plain
          :disabled="!disableJoin"
          class="Buttons1"
          id="LeaveBtn"
          >Leave
        </el-button> -->
      </div>
    </div>
    <button
      type="primary"
      @click="leaveEvent"
      plain
      :disabled="!disableJoin"
      class="Buttons1"
      id="LeaveBtn"
      >Leave
    </button>
    <div id="meetingControls">
      <!-- <button @click="disableVideo">Disable Video</button> -->
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
  </div>
</template>

<script>
import RTCClient from "../agora-rtc-client";
import StreamPlayer from "./stream-player";
import { log } from "../utils/utils";
// import { firebase } from "@firebase/app";
// import "firebase/auth";
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
    };
  },
  props: {
    msg: String,
  },
  methods: {
    disableVideo() {},
    joinEvent() {
      document.getElementById("MainBox").classList.add("hide");
      // this.$parent.showNotVideo();
      if (!this.option.appid) {
        this.judge("Appid");
        return;
      }
      if (!this.option.channel) {
        this.judge("Channel Name");
        return;
      }
      this.$router.push("/VideoPage");
      this.rtc
        .joinChannel(this.option)
        .then(() => {
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
        })
        .catch((err) => {
          this.$message.error("Join Failure");
          log("join channel error", err);
        });
      this.disableJoin = true;
      console.log("disableJoin = true");
    },
    leaveEvent() {
      this.$router.push("/");
      this.disableJoin = false;
      console.log("disableJoin = false");
      this.rtc
        .leaveChannel()
        .then(() => {
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
      this.$message(`Peer ${evt.uid} left`);
      this.remoteStreams = this.remoteStreams.filter(
        (it) => it.getId() !== evt.uid
      );
    });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->


<style>
video {
  position: relative !important;
  /* padding: 20px; */
  /* margin: 100px; */
  background-color: red;
}
</style>
<style scoped src="../assets/css/Call.css">
  .hide {
    display: none;
  }
  .show {
    display: inline-block;
  }
</style>