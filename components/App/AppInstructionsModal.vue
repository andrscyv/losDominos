<template>
  <div>
    <b-modal id="modal-instructions" title="Welcome!" style="color:black" busy>
      <p class="my-4">
        <ol>
          <li v-if="playerId === currentPlayerId">
            You are the game host. Click on "Start game" at the top menu to
            choose who plays the first tile and begin the game.
          </li>
          <li v-else>
            Wait for the game host to choose who plays the first tile and start the game.
          </li>
          <li>
            Click one of your dominoes. The positions where you can play
            will be highlighted in green. Click the green square to play a domino.
          </li>
          <li>
            Rearrange your dominoes by draggin them horizontally.
          </li>
        </ol>
      </p>
      <p ref="container" class=" text-center">
        Other players can join with this link!:  {{ matchUrl }}
        <input
          type="button"
          value="Copy to clipboard"
          style="margin:20px"
          @click="copy"
        >
      </p>
      <slot name="modal-footer" />
      <template #modal-footer>
        <br>
      </template>
    </b-modal>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
export default {
  computed: {
    ...mapGetters(['matchUrl']),
    ...mapState(['playerId', 'currentPlayerId'])
  },
  methods: {
    copy () {
      const container = this.$refs.container
      this.$copyText(this.matchUrl, container)
      alert('Link copied!')
    }
  }

}
</script>

<style scoped>
li {
    margin: 30px 0
}

</style>
