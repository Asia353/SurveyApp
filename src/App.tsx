import React from "react";
import { NextUIProvider } from "@nextui-org/react";
import { BrowserRouter as Router } from "react-router-dom";

import "./App.css";
import NavBar from "./components/NavBar";
import Navigation from "./navigation/Navigation";

function App() {
  return (
    <Router>
      <NextUIProvider>
        <NavBar />
        <Navigation />
      </NextUIProvider>
    </Router>
  );
}

export default App;
