<template>
  <div>
    <b-modal id="modal-game-over" ref="game-ended-modal" title="Game over!">
      <div class="content">
        <p>
          The winners are {{ firstWinner + ' and ' + secondWinner }}
        </p>
        <input type="button" value="Play again!" class="modal-btn" @click="startNewGame">
      </div>
      <slot name="modal-footer" />
      <template #modal-footer>
        <br>
      </template>
    </b-modal>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState(['winnerId', 'playerNames']),
    firstWinner () {
      return this.playerNames[this.winnerId] || `p${this.winnerId + 1}`
    },
    secondWinner () {
      const secondWinnerId = (this.winnerId + 2) % 4
      return this.playerNames[secondWinnerId] || `p${secondWinnerId + 1}`
    }
  },
  methods: {
    ...mapActions(['setNextMatchId']),
    async startNewGame () {
      await this.setNextMatchId()
      this.$refs['game-ended-modal'].hide()
      this.$game.client.stop()
      this.$router.go()
    }
  }
}
</script>

<style scoped>
.content{
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
.modal-btn{
  margin:10px 0;
}
</style>
