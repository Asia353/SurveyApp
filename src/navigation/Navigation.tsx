import React from "react";
import { Route, Routes } from "react-router-dom";
import {
  AddSurveyPage,
  MySurveysPage,
  StatisticsPage,
  SurveyDescriptionPage,
  SurveyFormPage,
} from "../pages";
import SignInPage from "../pages/SignInPage";
import SignUpPage from "../pages/SignUpPage";
import { SurveysContextProvider } from "../contexts/SurveysContext";

export default function Navigation() {
  return (
    <Routes>
      <Route path="/add-survey" element={<AddSurveyPage />} />
      <Route path="/my-surveys" element={<MySurveysPage />} />
      <Route path="/description-survey" element={<SurveyDescriptionPage />} />
      <Route path="/survey-form" element={<SurveyFormPage />} />
      <Route path="/statistics" element={<StatisticsPage />} />
      <Route path="/sign-in" element={<SignInPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />{" "}
    </Routes>
  );
}
