import React, { useEffect } from "react";
import "./App.css";
import life from "./GameOfLife";
import Game from "./Game";

function App() {
  // useEffect(() => life(), []);

  return (
    <div className="App">
      <Game />
      <button onClick={() => life()}>cc</button>
      Learn React
    </div>
  );
}

export default App;
