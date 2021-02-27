import { dealTiles, buildTiles } from './Dominoes'

test('it builds 28 tiles', () => {
  const tiles = buildTiles()
  expect(tiles.length).toBe(28)
})

test('it deals 4 hands', () => {
  const tiles = buildTiles()
  const tilesByPlayer = dealTiles(tiles)
  expect(tilesByPlayer.length).toBe(4)
})
