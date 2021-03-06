export const state = () => ({
  playerName: '',
  playerId: '',
  currentPlayerId: '',
  matchId: '',
  baseUrl: 'eldomino.surge.sh',
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
  selectedTile: null,
  numTilesByPlayer: [0, 0, 0, 0]
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
    state.currentPlayerId = ctx.currentPlayer
    state.numTilesByPlayer = G.tilesByPlayer.map(tiles => tiles.length)
  }
}

export const getters = {
  matchUrl (state) {
    return `${state.baseUrl}/?matchId=${state.matchId}`
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
