<template>
  <div class="tiles">
    <draggable
      v-model="tiles"
      style="display:flex"
    >
      <div v-for="tile in tiles" :key="tile.id">
        <domino
          :tile="tile.pips"
          :vertical="true"
          :class="{'tile--selected': tile.isSelected}"
          @click.native="selectTile(tile)"
        />
      </div>
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
export default {
  components: {
    draggable
  },
  data () {
    return {
    }
  },
  computed: {
    tiles: {
      get () {
        return this.$store.state.playerTiles
      },
      set (tiles) {
        this.$store.commit('setPlayerTiles', tiles)
      }
    }
  },
  methods: {
    selectTile (tile) {
      if (tile.isSelected) {
        this.$store.commit('setPlayerTileSelected', { tileId: tile.id, isSelected: false })
        this.$store.commit('setSelectedTile', null)
        return
      }

      this.$store.commit('setPlayerTileSelected', { tileId: tile.id, isSelected: true })
      this.$store.commit('setSelectedTile', tile.pips)
      this.tiles.forEach((t) => {
        if (t.id !== tile.id) {
          this.$store.commit('setPlayerTileSelected', { tileId: t.id, isSelected: false })
        }
      })
    }
  }

}
</script>

<style scoped>
.tiles{
    display: flex;
    width: 100%;
}
.tile--selected{
    transform: translateY(-20px);
}
</style>
