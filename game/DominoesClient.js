import { Client } from 'boardgame.io/client'
import { Dominoes } from './Dominoes'

export default class DominoesClient {
  start (playerId = '') {
    this.client = Client(
      {
        game: Dominoes,
        playerId
      }
    )
    this.client.start()
  }
}
