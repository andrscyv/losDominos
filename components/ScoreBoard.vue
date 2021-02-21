<template>
  <div>
    <player-info v-for="(player, idx) in players" :key="idx" v-bind="player" />
  </div>
</template>

<script>
import PlayerInfo from './PlayerInfo.vue'
export default {
  components: {
    PlayerInfo
  },
  data () {
    return {
      players: [
        {
          name: 'p1',
          tiles: 3,
          isNextToPlay: false
        },
        {
          name: 'p2',
          tiles: 4,
          isNextToPlay: true
        },
        {
          name: 'p3',
          tiles: 4,
          isNextToPlay: false
        },
        {
          name: 'p4',
          tiles: 4,
          isNextToPlay: false
        }
      ]
    }
  }

}
</script>

<style>

</style>
