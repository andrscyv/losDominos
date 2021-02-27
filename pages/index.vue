<template>
  <div>
    <h1 class="title">
      Dominó.
    </h1>
    <div class="game">
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
    // tilesPlayed () {
    //   // const tiles = []
    //   // for (let i = 0; i < 7; i++) {
    //   //   for (let k = i; k < 7; k++) { tiles.push([i, k]) }
    //   // }
    //   // return tiles
    //   return [
    //     [3, 6],
    //     [6, 6],
    //     [6, 2]
    //   ]
    // },
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
    this.$game.start()
  },
  methods: {
    isValidMove (tileToPlay, tileInBoard, inLeftCorner) {
      const suitAtEnd = tileInBoard[inLeftCorner ? 0 : 1]
      return tileToPlay[0] === suitAtEnd || tileToPlay[1] === suitAtEnd
    },
    playTile (tileAtBoardIdx) {
      if (!this.isValidMoveByTile[tileAtBoardIdx]) { return }
      const playAtLeftEnd = tileAtBoardIdx === 0
      this.$store.commit('playSelectedTile', {
        playAtLeftEnd,
        suitAtEnd: this.tilesPlayed[tileAtBoardIdx][playAtLeftEnd ? 0 : 1]

      })
    }
  }
}
</script>

<style scoped>
.title{
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    color: white;
    font-size: 30px;
    margin: 20px 10px
}
.game{
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding-bottom:180px;
}
</style>
