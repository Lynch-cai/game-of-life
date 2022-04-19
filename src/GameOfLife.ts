export default function life() {
  // ---------------------------------------------------------------------
  // The rules
  /*
      -  Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
      -  Any live cell with two or three live neighbours lives on to the next generation.
      -  Any live cell with more than three live neighbours dies, as if by overpopulation.
      -  Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.  
    */

  const MAP_SIZE_X = 10;
  const MAP_SIZE_Y = 10;
  const SPEED = 250; //ms

  const DEAD_CELL = 0;
  const LIVE_CELL = 1;

  let MATRIX = new Array(MAP_SIZE_Y)
    .fill(DEAD_CELL)
    .map(() => new Array(MAP_SIZE_X).fill(DEAD_CELL));

  const neighboursCoordinates = (x: number, y: number) => [
    [x, y - 1],
    [x + 1, y - 1],
    [x + 1, y],
    [x + 1, y + 1],
    [x, y + 1],
    [x - 1, y + 1],
    [x - 1, y],
    [x - 1, y - 1],
  ];

  // Planner #1
  MATRIX[2][3] = 1;
  MATRIX[3][4] = 1;
  MATRIX[4][2] = 1;
  MATRIX[4][3] = 1;
  MATRIX[4][4] = 1;

  // Planner #2
  // MATRIX[0][1] = 1;
  // MATRIX[1][2] = 1;
  // MATRIX[2][0] = 1;
  // MATRIX[2][1] = 1;
  // MATRIX[2][2] = 1;

  let MATRIX2 = new Array(MAP_SIZE_Y)
    .fill(DEAD_CELL)
    .map(() => new Array(MAP_SIZE_X).fill(DEAD_CELL));

  const cloneTwoDimensionsArray = (arr1: any[], arr2: any[]) => {
    for (let i = 0; i < arr1.length; i++) {
      arr2[i] = [...arr1[i]];
    }
  };

  cloneTwoDimensionsArray(MATRIX, MATRIX2);

  const isInMatrix = (x: number, y: number) =>
    x >= 0 && x < MAP_SIZE_X && y >= 0 && y < MAP_SIZE_Y;

  const getNeighbourCount = (x: number, y: number): number => {
    return neighboursCoordinates(x, y)
      .map((neighbour) =>
        isInMatrix(neighbour[0], neighbour[1])
          ? MATRIX[neighbour[0]][neighbour[1]]
          : 0,
      )
      .reduce((pv, cv) => pv + cv);
  };

  const setCellValue = (x: number, y: number) => {
    const neighbourCount = getNeighbourCount(x, y);
    // IF LIVE CELL

    if (MATRIX[x][y] === 1) {
      if (neighbourCount <= 1 || neighbourCount >= 4) {
        MATRIX2[x][y] = 0;
        // console.log("DIE");
      } else if (neighbourCount === 2 || neighbourCount === 3) {
        MATRIX2[x][y] = 1;
        // console.log(x, y, "STAY ALIVE");
      }
    }
    // ELSE (DEAD CELL)
    else {
      if (neighbourCount > 2 && neighbourCount < 4) {
        MATRIX2[x][y] = 1;
        // console.log(x, y, "SPAWN");
      }
    }
  };

  console.log(MATRIX);

  setInterval(() => {
    cloneTwoDimensionsArray(MATRIX, MATRIX2);
    for (let x = 0; x < MAP_SIZE_X; x++) {
      for (let y = 0; y < MAP_SIZE_Y; y++) {
        setCellValue(x, y);
      }
    }
    cloneTwoDimensionsArray(MATRIX2, MATRIX);
    console.log(MATRIX);
  }, SPEED);
}
