<template>
  <div class="agora-video-player" ref="player" :id="domId"></div>
</template>

<script>
export default {
  name: 'stream-player',
  props: [
    'stream',
    'domId',
  ],
  mounted () {
    this.$nextTick(function () {
      if (this.stream && !this.stream.isPlaying()) {
        this.stream.play(`${this.domId}`, {fit: 'cover'}, (err) => {
          if (err && err.status !== 'aborted') {
            console.warn('trigger autoplay policy')
          }
        })
      }
    })
  },
  beforeDestroy () {
    if (this.stream) {
      if (this.stream.isPlaying()) {
        this.stream.stop()
      }
      this.stream.close()
    }
  }
}
</script>

<style>
.agora-video-player {
  margin: 0px !important;
  width: 100px;
  
  padding: 0px;
  border-radius: 20%;
  overflow: hidden;
  border: 1px solid white;
  height: 100px;
}
</style>