<template>
  <div>
    <player-info
      v-for="(numTiles, idx) in numTilesByPlayer"
      :key="idx"
      :name="`${playerNames[idx]}` || 'p' + (idx+1)"
      :tiles="numTiles"
      :is-next-to-play="parseInt(currentPlayerId) === idx"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import PlayerInfo from './PlayerInfo.vue'
export default {
  components: {
    PlayerInfo
  },
  computed: {
    ...mapState(['currentPlayerId', 'numTilesByPlayer', 'playerNames'])
  }

}
</script>

<style>

</style>
