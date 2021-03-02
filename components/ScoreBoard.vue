<template>
  <div>
    <player-info
      v-for="(numTiles, idx) in numTilesByPlayer"
      :key="idx"
      :name="'p' + (idx+1)"
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
    ...mapState(['currentPlayerId', 'numTilesByPlayer'])
  }

}
</script>

<style>

</style>
