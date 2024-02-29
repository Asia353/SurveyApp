import React from "react";
import { Route, Routes } from "react-router-dom";
import {
  AddSurveyPage,
  MySurveysPage,
  NoMatchPage,
  StatisticsPage,
  SurveyDescriptionPage,
  SurveyFormPage,
} from "../pages";

export default function AuthenticatedStack() {
  return (
    <Routes>
      <Route path="/" element={<MySurveysPage />} />
      <Route path="/add-survey" element={<AddSurveyPage />} />
      <Route path="/my-surveys" element={<MySurveysPage />} />
      <Route path="/description-survey" element={<SurveyDescriptionPage />} />
      <Route path="/survey-form" element={<SurveyFormPage />} />
      <Route path="/statistics" element={<StatisticsPage />} />
      <Route path="*" element={<NoMatchPage />} />
    </Routes>
  );
}
