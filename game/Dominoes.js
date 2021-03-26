import { INVALID_MOVE } from 'boardgame.io/core'

export const Dominoes = {
  setup: (ctx) => {
    // const tiles = buildTiles()
    return {
      // tilesByPlayer: dealTiles(ctx.random.Shuffle(tiles)),
      tilesByPlayer: [
        [
          [0, 0]//, [6, 6]
        ],
        [
          [1, 1], [2, 1], [3, 1]
        ],
        [
          [1, 4], [2, 4], [3, 6]
        ],
        [
          [1, 5], [2, 5], [3, 5]
        ]
      ],
      tilesPlayed: [[0, 6]]
      // tilesPlayed: []
    }
  },
  moves: {
    playTile: (G, ctx, move) => {
      const { tilesPlayed } = G
      let { currentPlayer } = ctx
      currentPlayer = parseInt(currentPlayer)
      const { tile } = move
      const suitsAtEnds = getSuitsAtEnds(tilesPlayed)

      if (tileIsPlayable(tile, suitsAtEnds)) {
        const nextG = nextState(G, { ...move, player: ctx.currentPlayer })
        const nextSuitsAtEnds = getSuitsAtEnds(nextG.tilesPlayed)
        const nextPlayer = getNextPlayer(
          currentPlayer,
          nextG.tilesByPlayer,
          nextSuitsAtEnds
        )

        if (nextPlayer >= 0) {
          ctx.events.endTurn({ next: nextPlayer + '' })
        } else { ctx.events.endTurn() }

        return nextG
      } else {
        return INVALID_MOVE
      }
    },
    pass: (G, ctx) => {
      ctx.events.endTurn()
    },
    chooseFirstPlayer: (G, ctx, firstPlayerId) => {
      ctx.events.endTurn({ next: firstPlayerId })
    }

  },
  endIf: (G, ctx) => {
    const { tilesByPlayer, tilesPlayed } = G
    let { currentPlayer } = ctx
    currentPlayer = parseInt(currentPlayer)

    if (tilesPlayed.length === 0) { return }

    const suitsAtEnds = getSuitsAtEnds(tilesPlayed)
    const winner = getPlayerWithNoTiles(tilesByPlayer)
    if (winner >= 0) { return { winner } }

    const nextPlayer = getNextPlayer(currentPlayer, tilesByPlayer, suitsAtEnds)

    if (nextPlayer < 0) {
      const teamWithFewerPoints = getTeamWithFewerPoints(tilesByPlayer)
      if (teamWithFewerPoints >= 0) { return { winner: teamWithFewerPoints } }
    }
  }
}

export function dealTiles (tiles) {
  const tilesByPlayer = []

  for (let i = 0; i < 4; i++) {
    tilesByPlayer.push(tiles.slice(i * 7, (i * 7) + 7))
  }

  return tilesByPlayer
}

export function buildTiles () {
  const tiles = []
  for (let i = 0; i < 7; i++) {
    for (let k = i; k < 7; k++) {
      tiles.push([i, k])
    }
  }

  return tiles
}

export function nextState (G, { tile, playAtLeftEnd, player }) {
  const tilesPlayed = deepCopy(G.tilesPlayed)
  const nextTilesByPlayer = deepCopy(G.tilesByPlayer)
  let nextTilesPlayed = []
  const tileToPlay = [...tile]

  if (tilesPlayed.length === 0) {
    nextTilesPlayed = [tileToPlay]
  } else {
    const suitsAtEnds = getSuitsAtEnds(tilesPlayed)
    if (playAtLeftEnd) {
      if (suitsAtEnds[0] !== tileToPlay[1]) { tileToPlay.reverse() }
      nextTilesPlayed = [tileToPlay, ...tilesPlayed]
    } else {
      if (suitsAtEnds[1] !== tileToPlay[0]) { tileToPlay.reverse() }
      nextTilesPlayed = [...tilesPlayed, tileToPlay]
    }
  }

  nextTilesByPlayer[player] = nextTilesByPlayer[player].filter((t) => {
    return !areEqual(t, tile)
  })

  return {
    tilesPlayed: nextTilesPlayed,
    tilesByPlayer: nextTilesByPlayer
  }
}

export function getSuitsAtEnds (tilesPlayed) {
  return tilesPlayed.length > 0 ? [tilesPlayed[0][0], tilesPlayed[tilesPlayed.length - 1][1]] : []
}

export function areEqual (tile1, tile2) {
  const firstIsSubsetOfSecond = tile2.includes(tile1[0]) && tile2.includes(tile1[1])
  const secondIsSubsetOfFirst = tile1.includes(tile2[0]) && tile1.includes(tile2[1])
  return firstIsSubsetOfSecond && secondIsSubsetOfFirst
}

export function hasPlayableTile (playerTiles, suitsAtEnds) {
  for (const tile of playerTiles) {
    if (tileIsPlayable(tile, suitsAtEnds)) { return true }
  }

  return false
}

export function tileIsPlayable (tile, suitsAtEnds) {
  return suitsAtEnds.length > 0 ? suitsAtEnds.includes(tile[0]) || suitsAtEnds.includes(tile[1]) : true
}

export function getNextPlayer (currentPlayer, tilesByPlayer, suitsAtEnds) {
  for (let idx = currentPlayer + 1; idx <= currentPlayer + 4; idx++) {
    const player = idx % 4
    if (hasPlayableTile(tilesByPlayer[player], suitsAtEnds)) { return player }
  }
  return -1
}

export function getPlayerWithNoTiles (tilesByPlayer) {
  for (let i = 0; i < 4; i++) {
    if (tilesByPlayer[i].length === 0) {
      return i
    }
  }
  return -1
}

export function countPoints (playerTiles) {
  return playerTiles.map(tile => tile[0] + tile[1]).reduce((prev, curr) => prev + curr, 0)
}

export function getTeamWithFewerPoints (tilesByPlayer) {
  const pointsTeam0 = countPoints([...tilesByPlayer[0], ...tilesByPlayer[2]])
  const pointsTeam1 = countPoints([...tilesByPlayer[1], ...tilesByPlayer[3]])

  if (pointsTeam0 < pointsTeam1) { return 0 }
  if (pointsTeam0 > pointsTeam1) { return 1 }

  return -1
}

function deepCopy (arr) {
  return JSON.parse(JSON.stringify(arr))
}
