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
        :is-highlighted="idx===27"
      />
    </div>
    <score-board style="position:fixed;top:10px;right:30px" />
    <player-tiles style="position:fixed;bottom:0;left:0" />
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  computed: {
    tilesPlayed () {
      const tiles = []
      for (let i = 0; i < 7; i++) {
        for (let k = i; k < 7; k++) { tiles.push([i, k]) }
      }
      return tiles
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
