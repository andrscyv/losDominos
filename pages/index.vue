<template>
  <div>
    <h1 class="title">
      Domino.
    </h1>
    <div class="game">
      <!-- <div
        v-for="(row,i) in gameRows"
        :key="i"
        :style="{ flexDirection: i % 2 == 0 ? 'row' : 'row-reverse'}"
        class="game-row"
      >
        <div
          v-for="(tile,idx) in row"
          :key="idx"
        >
          <tile :tile="tile" />
        </div>
      </div> -->
      <div
        v-for="(tile,idx) in tilesPlayed"
        :key="idx"
      >
        <tile :tile="tile" />
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
.title{
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    color: white;
    font-size: 30px;
    margin: 20px 10px
}
.game-row{
    display: flex;
    justify-content: space-around;
}
.game{
    display: flex;
    flex-wrap: wrap;
}
</style>
