import { dealTiles, buildTiles, tileIsPlayable, hasPlayableTile, getNextPlayer, countPoints, getTeamWithFewerPoints, getSuitsAtEnds } from './Dominoes'

test('it builds 28 tiles', () => {
  const tiles = buildTiles()
  expect(tiles.length).toBe(28)
})

test('it deals 4 hands', () => {
  const tiles = buildTiles()
  const tilesByPlayer = dealTiles(tiles)
  expect(tilesByPlayer.length).toBe(4)
})

test('it gets suits at ends', () => {
  const tilesPlayed = [[1, 2], [4, 5]]
  expect(getSuitsAtEnds(tilesPlayed)).toStrictEqual([1, 5])
})

test('it gets suits at ends single tile', () => {
  const tilesPlayed = [[1, 2]]
  expect(getSuitsAtEnds(tilesPlayed)).toStrictEqual([1, 2])
})

test('it gets suits at ends single suit', () => {
  const tilesPlayed = [[1, 1]]
  expect(getSuitsAtEnds(tilesPlayed)).toStrictEqual([1, 1])
})

test('it gets suits at ends no suits', () => {
  const tilesPlayed = []
  expect(getSuitsAtEnds(tilesPlayed)).toStrictEqual([])
})

test('it checks if tile is playable true', () => {
  const tile = [1, 2]
  const suitsAtEnd = [2, 3]
  expect(tileIsPlayable(tile, suitsAtEnd)).toBe(true)
})

test('it checks if tile is playable false', () => {
  const tile = [1, 4]
  const suitsAtEnd = [2, 3]
  expect(tileIsPlayable(tile, suitsAtEnd)).toBe(false)
})

test('it checks if tile is playable at beginning', () => {
  const tile = [1, 4]
  const suitsAtEnd = []
  expect(tileIsPlayable(tile, suitsAtEnd)).toBe(true)
})

test('it checks if player has playable tile true ', () => {
  const playerTiles = [
    [1, 4],
    [3, 3],
    [5, 2],
    [2, 1]
  ]
  const suitsAtEnd = [2, 3]
  expect(hasPlayableTile(playerTiles, suitsAtEnd)).toBe(true)
})

test('it checks if player has playable tile false ', () => {
  const playerTiles = [
    [1, 4],
    [3, 3],
    [5, 2],
    [2, 1]
  ]
  const suitsAtEnd = [6, 6]
  expect(hasPlayableTile(playerTiles, suitsAtEnd)).toBe(false)
})

test('next player is 3', () => {
  const tilesByPlayer = [
    [
      [1, 2],
      [1, 3]
    ],
    [
      [2, 2],
      [1, 1],
      [3, 6]
    ],
    [
      [4, 2],
      [4, 3],
      [4, 4]
    ],
    [
      [5, 2],
      [5, 3],
      [5, 5]
    ]
  ]
  const currentPlayer = 1
  const suitsAtEnds = [5, 1]

  expect(getNextPlayer(currentPlayer, tilesByPlayer, suitsAtEnds)).toBe(3)
})

test('next player is 2', () => {
  const tilesByPlayer = [
    [
      [1, 2],
      [1, 3]
    ],
    [
      [2, 2],
      [1, 1],
      [3, 6]
    ],
    [
      [4, 2],
      [4, 3],
      [4, 4]
    ],
    [
      [5, 2],
      [5, 3],
      [5, 5]
    ]
  ]
  const currentPlayer = 1
  const suitsAtEnds = [5, 4]

  expect(getNextPlayer(currentPlayer, tilesByPlayer, suitsAtEnds)).toBe(2)
})

test('next player is 1', () => {
  const tilesByPlayer = [
    [
      [1, 2],
      [1, 3]
    ],
    [
      [2, 2],
      [1, 1],
      [3, 6]
    ],
    [
      [4, 2],
      [4, 3],
      [4, 4]
    ],
    [
      [5, 2],
      [5, 3],
      [5, 5]
    ]
  ]
  const currentPlayer = 1
  const suitsAtEnds = [6, 6]

  expect(getNextPlayer(currentPlayer, tilesByPlayer, suitsAtEnds)).toBe(1)
})

test('there isnt next player', () => {
  const tilesByPlayer = [
    [
      [1, 2],
      [1, 3]
    ],
    [
      [2, 2],
      [1, 1],
      [3, 3]
    ],
    [
      [4, 2],
      [4, 3],
      [4, 4]
    ],
    [
      [5, 2],
      [5, 3],
      [5, 5]
    ]
  ]
  const currentPlayer = 1
  const suitsAtEnds = [6, 6]

  expect(getNextPlayer(currentPlayer, tilesByPlayer, suitsAtEnds)).toBe(-1)
})

test('player has 23 points', () => {
  const playerTiles = [[1, 2], [4, 4], [6, 6]]
  expect(countPoints(playerTiles)).toBe(23)
})

test('player has 0 points', () => {
  const playerTiles = []
  expect(countPoints(playerTiles)).toBe(0)
})

test('team 0 has fewer points', () => {
  const tilesByPlayer = [
    [
      [1, 2],
      [1, 3]
    ],
    [
      [2, 2],
      [1, 1],
      [3, 3]
    ],
    [
      [4, 2],
      [4, 3],
      [4, 4]
    ],
    [
      [5, 2],
      [5, 3],
      [5, 5]
    ]
  ]
  expect(getTeamWithFewerPoints(tilesByPlayer)).toBe(0)
})

test('team 1 has fewer points', () => {
  const tilesByPlayer = [
    [
      [1, 2],
      [1, 3]
    ],
    [
      [2, 2],
      [1, 1],
      [3, 3]
    ],
    [
      [4, 2],
      [4, 3],
      [4, 4]
    ],
    [
      [5, 2],
      [5, 3],
      [0, 0]
    ]
  ]
  expect(getTeamWithFewerPoints(tilesByPlayer)).toBe(1)
})
