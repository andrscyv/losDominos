import { Client } from 'boardgame.io/client'
import { Dominoes } from '../game/Dominoes'

export default ({ app }, inject) => {
  inject('game', Client({
    game: Dominoes
  }))
}
