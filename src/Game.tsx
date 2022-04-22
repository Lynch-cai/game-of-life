import React, { useEffect } from "react";
import life, { initializeMatrix } from "./GameOfLife";
import styled from "styled-components";

function Game() {
  const drawGrid = (w: number, h: number, gridSize: number, id: any) => {
    const canvas: any = document.getElementById(id);
    const ctx = canvas.getContext("2d");
    ctx.canvas.width = w;
    ctx.canvas.height = h;
    for (let x = 0; x <= w; x += gridSize) {
      for (let y = 0; y <= h; y += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }
    }

    const maxSizeX = Math.floor(w / gridSize);
    const maxSizeY = Math.floor(h / gridSize);
    const speed = 100;

    // matrix
    let matrix = initializeMatrix(maxSizeX, maxSizeY);

    setInterval(() => {
      life(maxSizeX, maxSizeX, matrix).forEach((line, y) =>
        line.forEach((cell, x) => {
          if (cell === 1) {
            ctx.fillStyle = "black";
            ctx.fillRect(x * 20 + 1, y * 20 + 1, 18, 18);
          } else {
            ctx.fillStyle = "white";
            ctx.fillRect(x * 20 + 1, y * 20 + 1, 18, 18);
          }
        }),
      );
    }, speed);
  };

  useEffect(() => {
    drawGrid(800, 800, 20, "grid");
  });
  return <Canvas id="grid"></Canvas>;
}

export default Game;

const Canvas = styled.canvas`
  border: black 1px solid;
`;
