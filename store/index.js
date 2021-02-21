export const state = () => ({
  selectedTile: null
})

export const mutations = {
  setSelectedTile (state, tile) {
    state.selectedTile = tile
  }
}
