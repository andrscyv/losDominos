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
          @click.native="selectTile(tile.id)"
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
      tiles: [
        {
          id: 1,
          pips: [1, 2],
          isSelected: false
        },
        {
          id: 2,
          pips: [1, 3],
          isSelected: false
        },
        {
          id: 3,
          pips: [1, 4],
          isSelected: false
        }
      ]
    }
  },
  methods: {
    selectTile (id) {
      const tile = this.tiles.find(tile => tile.id === id)

      if (tile.isSelected) {
        tile.isSelected = false
        return
      }

      tile.isSelected = true
      this.tiles.forEach((tile) => {
        if (tile.id !== id) { tile.isSelected = false }
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
