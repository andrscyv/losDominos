import { Client } from 'boardgame.io/client'
import { SocketIO } from 'boardgame.io/multiplayer'
import { Dominoes } from './Dominoes'

export default class DominoesClient {
  start (playerID, matchID, credentials) {
    this.client = Client(
      {
        game: Dominoes,
        numPlayers: 4,
        // multiplayer: SocketIO({ server: '143.198.227.84:8000' }),
        multiplayer: SocketIO({ server: process.env.NUXT_ENV_SERVER_HOST || 'localhost:8000' }),
        playerID,
        matchID,
        credentials,
        debug: false
      }
    )
    this.client.start()
  }
}
