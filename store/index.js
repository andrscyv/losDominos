export const state = () => ({
  playerName: '',
  playerId: '',
  matchId: '',
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
  setPlayerName (state, playerName) {
    state.playerName = playerName
  },
  setPlayerId (state, playerId) {
    state.playerId = playerId
  },
  setMatchId (state, matchId) {
    state.matchId = matchId
  },
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
  setGameState (state, gameState) {
    if (!gameState) { return }
    const { G, ctx } = gameState
    console.log(ctx)
    state.tilesPlayed = G.tilesPlayed
    state.playerTiles = G.tilesByPlayer[parseInt(state.playerId)].map((tile, idx) => {
      return {
        id: idx,
        pips: tile,
        isSelected: false
      }
    })
  }
}

export const actions = {
  playSelectedTile ({ commit, state }, { playAtLeftEnd }) {
    if (!state.selectedTile) {
      return
    }
    this.$game.client.moves.playTile({
      tile: state.selectedTile,
      playAtLeftEnd
    })
    commit('setSelectedTile', null)
  }
}
