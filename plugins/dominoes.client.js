import DominoesClient from '../game/DominoesClient'

export default ({ app }, inject) => {
  inject('game', new DominoesClient())
}
