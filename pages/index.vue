<template>
  <div>
    Los dominos
    <div class="game">
      <div
        v-for="(row,i) in gameRows"
        :key="i"
        :style="{ flexDirection: i % 2 == 0 ? 'row' : 'row-reverse'}"
        class="game-row"
      >
        <div
          v-for="(tile,idx) in row"
          :key="idx"
        >
          {{ tile }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    //   tilesPlayed: [
    //     [1, 2],
    //     [1, 2],
    //     [1, 2],
    //     [1, 2],
    //     [1, 2],
    //     [1, 2],
    //     [1, 2]
    //   ]
      tilesPerRow: 10
    }
  },
  computed: {
    tilesPlayed () {
      const tiles = []
      for (let index = 0; index < 28; index++) {
        tiles.push([index, 1])
      }
      return tiles
    },
    gameRows () {
      const rows = []
      let currentRow = []

      this.tilesPlayed.forEach((tile) => {
        if (currentRow.length === this.tilesPerRow) {
          rows.push(currentRow)
          currentRow = []
        }
        currentRow.push(tile)
      })

      if (rows.flat().length < this.tilesPlayed.length) { rows.push(currentRow) }

      return rows
    }
  }

}
</script>

<style scoped>
.game-row{
    display: flex;
}
</style>
