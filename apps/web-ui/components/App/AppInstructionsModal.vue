<template>
  <div>
    <b-modal id="modal-instructions" :title="$t('welcome')" style="color:black" busy>
      <p class="my-4">
        <ol>
          <li v-if="playerId === currentPlayerId">
            {{ $t('host_message') }}
          </li>
          <li v-else>
            {{ $t('player_message') }}
          </li>
          <li>
            {{ $t('inst_1') }}
          </li>
          <li>
            {{ $t('inst_2') }}
          </li>
        </ol>
      </p>
      <p ref="container" class=" text-center">
        {{ $t('link_message') }}  {{ matchUrl }}
        <input
          type="button"
          :value="$t('clipboard')"
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
