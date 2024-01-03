import React, { useEffect, useState } from "react";
import { Button, NextUIProvider } from "@nextui-org/react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";

import "./App.css";
import NavBar from "./components/NavBar";
import {
  AddSurveyPage,
  MySurveysPage,
  StatisticsPage,
  SurveyDescriptionPage,
  SurveyFormPage,
} from "./pages";
import { SurveysContextProvider } from "./SurveysContext";
import LogInPage from "./pages/LogInPage";
import SignUpPage from "./pages/SignUpPage";

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
            path="/my-surveys"
            element={
              <SurveysContextProvider>
                <MySurveysPage />
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
          <Route
            path="/survey-form"
            element={
              <SurveysContextProvider>
                <SurveyFormPage />
              </SurveysContextProvider>
            }
          />
          <Route
            path="/log-in"
            element={
              <SurveysContextProvider>
                <LogInPage />
              </SurveysContextProvider>
            }
          />
          <Route
            path="/sign-up"
            element={
              <SurveysContextProvider>
                <SignUpPage />
              </SurveysContextProvider>
            }
          />
          <Route
            path="/statistics"
            element={
              <SurveysContextProvider>
                <StatisticsPage />
              </SurveysContextProvider>
            }
          />
        </Routes>
      </NextUIProvider>
    </Router>
  );
}

export default App;
