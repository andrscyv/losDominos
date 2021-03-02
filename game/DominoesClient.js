import { Client } from 'boardgame.io/client'
import { SocketIO } from 'boardgame.io/multiplayer'
import { Dominoes } from './Dominoes'

export default class DominoesClient {
  start (playerID = '') {
    console.log(playerID)
    this.client = Client(
      {
        game: Dominoes,
        numPlayers: 4,
        multiplayer: SocketIO({ server: 'localhost:8000' }),
        playerID,
        debug: false
      }
    )
    this.client.start()
  }
}
