const DEAD_CELL = 0;
const LIVE_CELL = 1;

export const initializeMatrix = (y_size: number, x_size: number) => {
  const matrix = new Array(y_size)
    .fill(DEAD_CELL)
    .map(() => new Array(x_size).fill(DEAD_CELL));

  // randomize
  const randomizeSpawn = () => {
    for (let y = 0; y < y_size; y++) {
      for (let x = 0; x < x_size; x++) {
        matrix[y][x] = Math.floor(Math.random() * 2);
      }
    }
  };
  randomizeSpawn();

  // Configuration planneur
  // matrix[0][1] = 1;
  // matrix[1][2] = 1;
  // matrix[2][0] = 1;
  // matrix[2][1] = 1;
  // matrix[2][2] = 1;

  return matrix;
};

export const isInMatrix = (
  x: number,
  y: number,
  mapSizeX: number,
  mapSizeY: number,
): boolean => x >= 0 && x < mapSizeX && y >= 0 && y < mapSizeY;

export const neighboursCoordinates = (x: number, y: number): number[][] => [
  [x, y - 1],
  [x + 1, y - 1],
  [x + 1, y],
  [x + 1, y + 1],
  [x, y + 1],
  [x - 1, y + 1],
  [x - 1, y],
  [x - 1, y - 1],
];

export const getNeighbourCount = (
  x: number,
  y: number,
  matrix: number[][],
  mapSizeX: number,
  mapSizeY: number,
): number => {
  return neighboursCoordinates(x, y)
    .map((neighbour) =>
      isInMatrix(neighbour[0], neighbour[1], mapSizeX, mapSizeY)
        ? matrix[neighbour[0]][neighbour[1]]
        : 0,
    )
    .reduce((pv, cv) => pv + cv);
};

export default function life(
  maxSizeX: number,
  maxSizeY: number,
  matrix: number[][],
) {
  // ---------------------------------------------------------------------
  // The rules
  /*
      -  Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
      -  Any live cell with two or three live neighbours lives on to the next generation.
      -  Any live cell with more than three live neighbours dies, as if by overpopulation.
      -  Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.  
    */
  const MAP_SIZE_X = maxSizeX;
  const MAP_SIZE_Y = maxSizeY;

  interface Cell {
    alive?: [number, number];
    dead?: [number, number];
    empty?: [number, number];
  }
  const setCellValue = (x: number, y: number, matrix: number[][]): Cell => {
    const neighbourCount = getNeighbourCount(
      x,
      y,
      matrix,
      MAP_SIZE_X,
      MAP_SIZE_Y,
    );
    switch (matrix[x][y]) {
      case LIVE_CELL:
        if (neighbourCount === 2 || neighbourCount === 3) {
          return { alive: [x, y] };
        }

        return { dead: [x, y] };

      case DEAD_CELL:
        if (neighbourCount === 3) {
          return { alive: [x, y] };
        }
        return { empty: [0, 0] };

      default:
        return { empty: [0, 0] };
    }
  };

  interface Cells {
    alive: number[][];
    dead: number[][];
  }
  const checkEveryCell = (matrix: number[][]): number[][] => {
    const tmp: Cells = {
      alive: [],
      dead: [],
    };

    for (let x = 0; x < MAP_SIZE_X; x++) {
      for (let y = 0; y < MAP_SIZE_Y; y++) {
        if (setCellValue(x, y, matrix).empty) continue;

        const aliveCellValue = setCellValue(x, y, matrix).alive;
        const deadCellValue = setCellValue(x, y, matrix).dead;

        if (aliveCellValue) tmp.alive.push(aliveCellValue);
        if (deadCellValue) tmp.dead.push(deadCellValue);
      }
    }

    // Mettre à jour
    tmp.alive.forEach((cell) => {
      matrix[cell[0]][cell[1]] = LIVE_CELL;
    });
    tmp.dead.forEach((cell) => {
      matrix[cell[0]][cell[1]] = DEAD_CELL;
    });

    return matrix;
  };

  matrix = checkEveryCell(matrix);
  return matrix;
}
