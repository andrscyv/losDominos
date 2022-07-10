import { LobbyClient } from 'boardgame.io/client'

const SERVER_HOST = process.env.NUXT_ENV_SERVER_HOST || 'http://localhost:8000'
const BASE_URL = process.env.NUXT_ENV_BASE_URL || 'http://localhost:3000'

const lobbyClient = new LobbyClient({ server: SERVER_HOST })
export const state = () => ({
  playerName: window.localStorage.getItem('app_playerName') || '',
  playerId: window.localStorage.getItem('app_playerId') || '',
  currentPlayerId: '',
  matchId: window.localStorage.getItem('app_matchId') || '',
  winnerId: '',
  playerCredentials: window.localStorage.getItem('app_playerCredentials') || '',
  baseUrl: BASE_URL,
  playerNames: ['', '', '', ''],
  tilesPlayed: [
    // [3, 6],
    // [6, 6],
    // [6, 2]

  ],
  playerTiles: [
    // {
    //   id: 1,
    //   pips: [1, 2],
    //   isSelected: false
    // },
    // {
    //   id: 2,
    //   pips: [4, 3],
    //   isSelected: false
    // },
    // {
    //   id: 3,
    //   pips: [6, 4],
    //   isSelected: false
    // },
    // {
    //   id: 4,
    //   pips: [1, 1],
    //   isSelected: false
    // },
    // {
    //   id: 5,
    //   pips: [6, 5],
    //   isSelected: false
    // },
    // {
    //   id: 6,
    //   pips: [2, 3],
    //   isSelected: false
    // },
    // {
    //   id: 7,
    //   pips: [0, 4],
    //   isSelected: false
    // }
  ],
  selectedTile: null,
  numTilesByPlayer: [0, 0, 0, 0]
})

export const mutations = {
  setPlayerName (state, playerName) {
    state.playerName = playerName
    window.localStorage.setItem('app_playerName', playerName)
  },
  setPlayerId (state, playerId) {
    state.playerId = playerId
    window.localStorage.setItem('app_playerId', playerId)
  },
  setMatchId (state, matchId) {
    state.matchId = matchId
    window.localStorage.setItem('app_matchId', matchId)
  },
  setPlayerCredentials (state, playerCredentials) {
    state.playerCredentials = playerCredentials
    window.localStorage.setItem('app_playerCredentials', playerCredentials)
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
    commit('setSelectedTile', null)
  },
  async createMatch ({ commit, state }, { numPlayers }) {
    const { matchID } = await lobbyClient.createMatch('default', { numPlayers })
    commit('setMatchId', matchID)
  },
  async joinMatch ({ commit, state }, { playerID, playerName }) {
    const { playerCredentials } = await lobbyClient.joinMatch('default', state.matchId, {
      playerID,
      playerName
    })

    commit('setPlayerCredentials', playerCredentials)
    commit('setPlayerId', playerID)
  },
  async setNextMatchId ({ commit, state }) {
    const { nextMatchID } = await lobbyClient.playAgain('default', state.matchId, {
      playerID: state.playerId,
      credentials: state.playerCredentials
    })
    commit('setMatchId', nextMatchID)
  }

}
