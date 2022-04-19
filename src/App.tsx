import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import life from "./GameOfLife";

function App() {
  // useEffect(() => life(), []);

  return (
    <div className="App">
      <button onClick={() => life()}>cc</button>
      Learn React
    </div>
  );
}

export default App;
