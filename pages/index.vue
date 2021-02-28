<template>
  <div class="content">
    <div class="typewriter">
      <h1>
        Dominó.
      </h1>
    </div>
    <div class="user-form">
      <div>
        <span> PlayerId: </span>
        <input id="" v-model="playerId" type="text" name="">
        <br>
        <input type="button" value="play" @click="submitInfo">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      playerId: ''
    }
  },
  methods: {
    submitInfo () {
      this.$store.commit('setPlayerId', this.playerId)
      this.$router.push('game')
    }
  }

}
</script>

<style scoped>
.user-form{
    height: 400px;
    display: flex;
    justify-content: center;
    margin-top:50px;
}
/* DEMO-SPECIFIC STYLES */
.typewriter h1 {
  width: 200px;
  overflow: hidden; /* Ensures the content is not revealed until the animation */
  border-right: .15em solid white; /* The typwriter cursor */
  white-space: nowrap; /* Keeps the content on a single line */
  margin: 0 auto; /* Gives that scrolling effect as the typing happens */
  margin-top: 150px;
  letter-spacing: .15em; /* Adjust as needed */
  animation:
    typing 1.5s steps(8, end),
    blink-caret .5s step-end infinite;
}

/* The typing effect */
@keyframes typing {
  from { width: 0 }
  to { width: 200px }
}

/* The typewriter cursor effect */
@keyframes blink-caret {
  from, to { border-color: transparent }
  50% { border-color: white }
}
</style>
