export const Dominoes = {
  setup: (ctx) => {
    const tiles = buildTiles()
    return {
      tilesByPlayer: dealTiles(ctx.random.Shuffle(tiles)),
      playedTiles: []
    }
  },
  moves: {
    playTile (G, ctx, move) {
      if (isValidMove(G, move)) {
        nextState(G, move)
      }
    },
    pass (G, ctx) {
      console.log('hla')
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

export function isValidMove (G, { tile, playAtLeftSide }) {
  return true
}

export function nextState (G, { tile, playAtLeftSide, player }) {
  if (playAtLeftSide) {
    G.playedTiles.unshift(tile)
  } else {
    G.playedTiles.push(tile)
  }

  G.tilesByPlayer[player] = G.tilesByPlayer[player].filter(t => !areEqual(t, tile))
}

export function areEqual (tile1, tile2) {
  return tile2.includes(tile1[0]) && tile2.includes(tile1[1])
}
