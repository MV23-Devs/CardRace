<template>
  <div class="home">
    <Call> </Call>
  </div>
</template>

<script>
// @ is an alias to /src
import Call from '@/components/Call.vue'

export default {
  name: 'Home',
  components: {
    Call
  }
}
</script>