import React, { useEffect, useState } from "react";
import { Button, NextUIProvider } from "@nextui-org/react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";

import "./App.css";
import NavBar from "./components/NavBar";
import { AddSurveyPage, MySurvaysPage, SurveyDescriptionPage } from "./pages";
import { SurveysContextProvider } from "./SurveysContext";

function App() {
  return (
    <Router>
      <NextUIProvider>
        <NavBar />
        <Routes>
          <Route
            path="/add-survey"
            element={
              <SurveysContextProvider>
                <AddSurveyPage />
              </SurveysContextProvider>
            }
          />
          <Route
            path="/my-survey"
            element={
              <SurveysContextProvider>
                <MySurvaysPage />
              </SurveysContextProvider>
            }
          />
          <Route
            path="/description-survey"
            element={
              <SurveysContextProvider>
                <SurveyDescriptionPage />
              </SurveysContextProvider>
            }
          />
        </Routes>
      </NextUIProvider>
    </Router>
  );
}

export default App;
