import { LobbyClient } from 'boardgame.io/client'

// const lobbyClient = new LobbyClient({ server: 'http://143.198.227.84:8000' })
const lobbyClient = new LobbyClient({ server: 'http://localhost:8000' })

export const state = () => ({
  playerName: '',
  playerId: '',
  currentPlayerId: '',
  matchId: '',
  winnerId: '',
  playerCredentials: '',
  baseUrl: 'http://eldomino.surge.sh',
  playerNames: ['', '', '', ''],
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
  setPlayerCredentials (state, playerCredentials) {
    state.playerCredentials = playerCredentials
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
    const { gameover } = ctx
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

    if (gameover) {
      state.winnerId = gameover.winner
    }
    this.$game.client.matchData.forEach((player) => {
      if (player.name) { state.playerNames.splice(player.id, 1, player.name) }
    })
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
    console.log('playSeletectedTile', state.selectedTile)
    commit('setSelectedTile', null)
  },
  async createMatch ({ commit, state }, { numPlayers }) {
    const { matchID } = await lobbyClient.createMatch('default', { numPlayers })
    commit('setMatchId', matchID)
  },
  async joinMatch ({ commit, state }, { playerID, playerName }) {
    console.log(playerID)
    console.log(playerName)
    const { playerCredentials } = await lobbyClient.joinMatch('default', state.matchId, {
      playerID,
      playerName
    })

    commit('setPlayerCredentials', playerCredentials)
    commit('setPlayerId', playerID)
  }
}
