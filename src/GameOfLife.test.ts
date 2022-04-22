import { isInMatrix, neighboursCoordinates } from "./GameOfLife";

it("check if the cell is in the matrix", () => {
  expect(isInMatrix(1, 1, 1200, 800)).toBe(true);

  expect(isInMatrix(-1, -1, 1200, 800)).toBe(false);
  expect(isInMatrix(1201, 1, 1200, 800)).toBe(false);
  expect(isInMatrix(1, 801, 1200, 800)).toBe(false);
});

it("return the neighbours coordinates", () => {
  expect(neighboursCoordinates(1, 1)).toBe([
    [1, 0],
    [2, 0],
    [2, 1],
    [2, 2],
    [1, 2],
    [0, 2],
    [0, 1],
    [0, 0],
  ]);
});
