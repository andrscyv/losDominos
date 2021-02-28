<template>
  <div>
    <b-button v-b-modal.modal-1>
      Launch demo modal
    </b-button>

    <b-modal id="modal-1" title="Welcome!" style="color:black" busy>
      <p class="my-4">
        <ol>
          <li>
            Choose the first person to play and have her/him click the "Start game" button at the top.
          </li>
          <li>
            Click one of your dominoes. The positions where you can play
            will be highlighted in green. Click the green square to play a domino.
          </li>
          <li>
            You can rearrange your dominoes by draggin them.
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
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['matchUrl'])
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
