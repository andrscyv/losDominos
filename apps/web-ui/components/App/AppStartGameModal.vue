<template>
  <div>
    <b-modal id="modal-start-game" :title="$t('start_message')">
      <div class="start-game-form">
        <p>
          {{ $t('choose') }}
        </p>
        <div class="form-input">
          <span> {{ $t('seat') }} </span>
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
        <input type="button" :value="$t('start_message')" class="form-btn" @click="startGame">
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
