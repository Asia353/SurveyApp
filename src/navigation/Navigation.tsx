import React from "react";
import { Route, Routes } from "react-router-dom";
import {
  AddSurveyPage,
  MySurveysPage,
  StatisticsPage,
  SurveyDescriptionPage,
  SurveyFormPage,
} from "../pages";
import { SurveysContextProvider } from "../SurveysContext";
import LogInPage from "../pages/LogInPage";
import SignUpPage from "../pages/SignUpPage";

export default function Navigation() {
  return (
    <SurveysContextProvider>
      <Routes>
        <Route path="/add-survey" element={<AddSurveyPage />} />
        <Route path="/my-surveys" element={<MySurveysPage />} />
        <Route path="/description-survey" element={<SurveyDescriptionPage />} />
        <Route path="/survey-form" element={<SurveyFormPage />} />
        <Route path="/statistics" element={<StatisticsPage />} />
        <Route path="/log-in" element={<LogInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />{" "}
      </Routes>
    </SurveysContextProvider>
  );
}
