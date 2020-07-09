import React from "react";
import "./App.css";
import Appbar from "./AppBar";
import SignIn from "./SignIn";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Appbar />
        <SignIn />
      </header>
    </div>
  );
}

export default App;
