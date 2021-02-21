export const state = () => ({
  tilesPlayed: [
    [3, 6],
    [6, 6],
    [6, 2]

  ],
  playerTiles: [
    {
      id: 1,
      pips: [1, 2],
      isSelected: false
    },
    {
      id: 2,
      pips: [4, 3],
      isSelected: false
    },
    {
      id: 3,
      pips: [6, 4],
      isSelected: false
    },
    {
      id: 4,
      pips: [1, 1],
      isSelected: false
    },
    {
      id: 5,
      pips: [6, 5],
      isSelected: false
    },
    {
      id: 6,
      pips: [2, 3],
      isSelected: false
    },
    {
      id: 7,
      pips: [0, 4],
      isSelected: false
    }
  ],
  selectedTile: null
})

export const mutations = {
  setPlayerTiles (state, tiles) {
    state.playerTiles = tiles
  },
  setPlayerTileSelected (state, { tileId, isSelected }) {
    const tile = state.playerTiles.find(tile => tile.id === tileId)
    tile.isSelected = isSelected
  },
  setSelectedTile (state, tile) {
    state.selectedTile = tile
  },
  playSelectedTile (state, { playAtLeftEnd, suitAtEnd }) {
    if (!state.selectedTile) {
      return
    }

    const tileToPlay = state.selectedTile

    if (playAtLeftEnd) {
      if (suitAtEnd !== tileToPlay[1]) { tileToPlay.reverse() }
      state.tilesPlayed.unshift(tileToPlay)
    } else {
      if (suitAtEnd !== tileToPlay[0]) { tileToPlay.reverse() }
      state.tilesPlayed.push(tileToPlay)
    }

    state.playerTiles = state.playerTiles.filter((tile) => {
      return !(tile.pips[0] === tileToPlay[0] && tile.pips[1] === tileToPlay[1])
    })
    state.selectedTile = null
  }
}
