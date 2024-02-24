import React from "react";
import { NextUIProvider } from "@nextui-org/react";
import { BrowserRouter as Router } from "react-router-dom";

import "./App.css";
import NavBar from "./components/NavBar";
import Navigation from "./navigation/Navigation";
import { SurveysContextProvider } from "./contexts/SurveysContext";
import { UserContextProvider } from "./contexts/UserContext";

function App() {
  return (
    <Router>
      <NextUIProvider>
        <SurveysContextProvider>
          <UserContextProvider>
            <NavBar />
            <Navigation />
          </UserContextProvider>
        </SurveysContextProvider>
      </NextUIProvider>
    </Router>
  );
}

export default App;
