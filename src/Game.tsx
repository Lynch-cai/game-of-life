import React, { useEffect } from "react";
import life from "./GameOfLife";
import styled from "styled-components";

function Game() {
  var drawGrid = function (w: any, h: any, id: any) {
    var canvas: any = document.getElementById(id);
    var ctx = canvas.getContext("2d");
    ctx.canvas.width = w;
    ctx.canvas.height = h;

    for (let x = 0; x <= w; x += 20) {
      for (let y = 0; y <= h; y += 20) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }
    }
  };

  useEffect(() => {
    drawGrid(800, 800, "grid");
  });
  return <Canvas id="grid"></Canvas>;
}

export default Game;

const Canvas = styled.canvas`
  border: black 1px solid;
`;
