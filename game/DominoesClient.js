import { Client } from 'boardgame.io/client'
import { SocketIO } from 'boardgame.io/multiplayer'
import { Dominoes } from './Dominoes'

export default class DominoesClient {
  start (playerID, matchID, credentials) {
    console.log(playerID)
    console.log('client ', credentials)
    this.client = Client(
      {
        game: Dominoes,
        numPlayers: 4,
        // multiplayer: SocketIO({ server: '143.198.227.84:8000' }),
        multiplayer: SocketIO({ server: 'localhost:8000' }),
        playerID,
        matchID,
        credentials,
        debug: false
      }
    )
    this.client.start()
  }
}
