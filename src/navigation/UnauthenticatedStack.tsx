import React from "react";
import { Route, Routes } from "react-router-dom";
import {
  AfterSendAnswersPage,
  NoMatchPage,
  SignInPage,
  SignUpPage,
  SurveyFormPage,
} from "../pages";

export default function UnauthenticatedStack() {
  return (
    <Routes>
      <Route path="/" element={<SignInPage />} />
      <Route path="/survey-form" element={<SurveyFormPage />} />
      <Route path="/replies-sent" element={<AfterSendAnswersPage />} />
      <Route path="/sign-in" element={<SignInPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="*" element={<NoMatchPage />} />
    </Routes>
  );
}
