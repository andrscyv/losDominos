export const Dominoes = {
  setup: (ctx) => {
    const tiles = buildTiles()
    return {
      tilesByPlayer: dealTiles(ctx.random.Shuffle(tiles)),
      tilesPlayed: [[2, 3]]
    }
  },
  turn: {
    moveLimit: 1
  },
  moves: {
    playTile: (G, ctx, move) => {
      if (isValidMove(G, move)) {
        nextState(G, { ...move, player: ctx.currentPlayer })
      }
    },
    pass: (G, ctx) => {

    }
  },
  endIf: (G, ctx) => {
    for (let i = 0; i < 4; i++) {
      if (G.tilesByPlayer[i].length === 0) {
        return { winner: i }
      }
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

export function isValidMove (G, { tile, playAtLeftEnd }) {
  return true
}

export function nextState (G, { tile, playAtLeftEnd, player }) {
  const { tilesPlayed } = G

  if (tilesPlayed.length === 0) {
    tilesPlayed.push(tile)
  } else {
    const suitsAtEnds = getSuitsAtEnds(tilesPlayed)
    const tileToPlay = [...tile]
    if (playAtLeftEnd) {
      if (suitsAtEnds[0] !== tileToPlay[1]) { tileToPlay.reverse() }
      tilesPlayed.unshift(tileToPlay)
    } else {
      if (suitsAtEnds[1] !== tileToPlay[0]) { tileToPlay.reverse() }
      tilesPlayed.push(tileToPlay)
    }
  }

  G.tilesByPlayer[player] = G.tilesByPlayer[player].filter(t => !areEqual(t, tile))
}

export function getSuitsAtEnds (tilesPlayed) {
  return [tilesPlayed[0][0], tilesPlayed[tilesPlayed.length - 1][1]]
}

export function areEqual (tile1, tile2) {
  return tile2.includes(tile1[0]) && tile2.includes(tile1[1])
}
