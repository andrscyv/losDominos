<template>
  <div class="content">
    <div class="typewriter">
      <h1>
        Dominó.
      </h1>
    </div>
    <div class="user-form">
      <div class="form-input">
        <span> Name: </span>
        <input id="" v-model="playerName" type="text" name="">
      </div>
      <div class="form-input">
        <span> Seat: </span>
        <select v-model="playerId">
          <option value="0">
            1
          </option>
          <option value="1">
            2
          </option>
          <option value="2">
            3
          </option>
          <option value="3">
            4
          </option>
        </select>
      </div>
      <input v-if="matchId" type="button" value="Join game" class="form-btn" @click="joinGame">
      <input type="button" value="New game" class="form-btn" @click="newGame">
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      playerName: '',
      playerId: '0',
      matchId: ''
    }
  },
  mounted () {
    this.matchId = this.$route.query.matchId
  },
  methods: {
    ...mapMutations(['setPlayerName', 'setPlayerId', 'setMatchId']),
    async joinGame () {
      this.setMatchId(this.matchId)
      await this.enterGame()
    },
    async newGame () {
      await this.$store.dispatch('createMatch', { numPlayers: 4 })
      await this.enterGame()
    },
    async enterGame () {
      try {
        await this.$store.dispatch('joinMatch', {
          playerID: this.playerId,
          playerName: this.playerName
        })
        this.$router.push('game')
      } catch (error) {
        alert('Somebody is at that seat !')
      }
    },
    saveUserData () {
      this.setPlayerName(this.playerName)
      this.setPlayerId(this.playerId)
    }

  }

}
</script>

<style scoped>
.user-form{
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: center;
    margin:30px 0;
}
.form-input{
  margin:10px 0;
  display:flex;
  justify-content: space-between;
  width: 300px;
}
.form-btn{
  margin:10px 0;
}
/* DEMO-SPECIFIC STYLES */
.typewriter h1 {
  width: 165px;
  overflow: hidden; /* Ensures the content is not revealed until the animation */
  border-right: .15em solid white; /* The typwriter cursor */
  white-space: nowrap; /* Keeps the content on a single line */
  margin: 0 auto; /* Gives that scrolling effect as the typing happens */
  margin-top: 150px;
  letter-spacing: .15em; /* Adjust as needed */
  animation:
    typing 1.5s steps(8, end),
    blink-caret .5s step-end infinite;
  font-size: 2em;
}

/* The typing effect */
@keyframes typing {
  from { width: 0 }
  to { width: 165px }
}

/* The typewriter cursor effect */
@keyframes blink-caret {
  from, to { border-color: transparent }
  50% { border-color: white }
}
</style>
