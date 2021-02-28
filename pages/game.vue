<template>
  <div>
    <app-nav-bar />
    <div class="game">
      <empty-domino v-if="tilesPlayed.length === 0 && selectedTile" @click.native="playFirstTile()" />
      <domino
        v-for="(tile,idx) in tilesPlayed"
        :key="idx"
        :tile="tile"
        :is-highlighted="isValidMoveByTile[idx]"
        @click.native="playTile(idx)"
      />
    </div>
    <score-board style="position:fixed;top:10px;right:30px" />
    <player-tiles style="position:fixed;bottom:0;left:0" />
    <app-instructions-modal />
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapState(['selectedTile', 'tilesPlayed']),
    isValidMoveByTile () {
      const isValidArr = Array(this.tilesPlayed.length).fill(false)
      if (!this.selectedTile) {
        return isValidArr
      }

      isValidArr[0] = this.isValidMove(this.selectedTile, this.tilesPlayed[0], true)
      isValidArr[this.tilesPlayed.length - 1] = this.isValidMove(this.selectedTile, this.tilesPlayed[this.tilesPlayed.length - 1], false)
      return isValidArr
    }
  },
  mounted () {
    this.$game.start(this.$store.state.playerId)
    this.$game.client.subscribe(state => this.$store.commit('setGameState', state))
  },
  methods: {
    isValidMove (tileToPlay, tileInBoard, inLeftCorner) {
      if (this.tilesPlayed.length === 1) {
        return tileToPlay.filter(tile => tileInBoard.includes(tile)).length > 0
      }
      const suitAtEnd = tileInBoard[inLeftCorner ? 0 : 1]
      return tileToPlay[0] === suitAtEnd || tileToPlay[1] === suitAtEnd
    },
    playTile (tileAtBoardIdx) {
      if (!this.isValidMoveByTile[tileAtBoardIdx]) { return }

      let playAtLeftEnd = tileAtBoardIdx === 0
      if (this.tilesPlayed.length === 1) {
        playAtLeftEnd = this.selectedTile.includes(this.tilesPlayed[tileAtBoardIdx][0])
      }
      this.$store.dispatch('playSelectedTile', { playAtLeftEnd })
    },
    playFirstTile () {
      this.$store.dispatch('playSelectedTile', { playAtLeftEnd: true })
    }
  }
}
</script>

<style scoped>
.game{
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding-bottom:180px;
}
</style>
