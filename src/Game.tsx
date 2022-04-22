import React, { useEffect } from "react";
import life, { initializeMatrix } from "./GameOfLife";
import styled from "styled-components";

function Game() {
  const drawGrid = (w: number, h: number, gridSize: number, id: any) => {
    const canvas: any = document.getElementById(id);
    const ctx = canvas.getContext("2d");
    ctx.canvas.width = w;
    ctx.canvas.height = h;

    const maxSizeX = Math.floor(w / gridSize);
    const maxSizeY = Math.floor(h / gridSize);
    const speed = 100;

    // matrix
    let matrix = initializeMatrix(maxSizeX, maxSizeY);

    return setInterval(() => {
      ctx.fillStyle = "#1B1B1B";
      ctx.fillRect(0, 0, w, h);
      life(maxSizeX, maxSizeX, matrix).forEach((line, y) =>
        line.forEach((cell, x) => {
          if (cell === 1) {
            ctx.fillStyle = `#FFFFFF`;
            ctx.fillRect(
              x * gridSize + 1,
              y * gridSize + 1,
              gridSize - 2,
              gridSize - 2,
            );
          }
        }),
      );
    }, speed);
  };

  useEffect(() => {
    const interval = drawGrid(500, 500, 5, "grid");
    return () => clearInterval(interval);
  });
  return (
    <>
      <Canvas id="grid"></Canvas>;
    </>
  );
}

export default Game;

const Canvas = styled.canvas`
  border: #333333 1px solid;
  background: #1b1b1b;
  border-radius: 1rem;
  padding: 1rem;
`;
