<template>
  <div>
    <b-modal id="modal-start-game" title="Start the game!">
      <div class="start-game-form">
        <p>
          Choose who plays the first tile.
        </p>
        <div class="form-input">
          <span> Seat: </span>
          <select v-model="firstPlayerId">
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
        <input type="button" value="Start game!" class="form-btn" @click="startGame">
      </div>
      <slot name="modal-footer" />
      <template #modal-footer>
        <br>
      </template>
    </b-modal>
  </div>
</template>

<script>
export default {
  data () {
    return {
      firstPlayerId: '0'
    }
  },
  methods: {
    startGame () {
      console.log(this.firstPlayerId + 'begins!!')
      this.$game.client.moves.chooseFirstPlayer(this.firstPlayerId)
      this.$bvModal.hide('modal-start-game')
    }
  }

}
</script>

<style scoped>
.start-game-form{
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
</style>
