import React, { useEffect } from "react";
import { NextUIProvider } from "@nextui-org/react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";

import "./App.css";
import NavBar from "./components/NavBar";
import { AddSurveyPage, MySurvaysPage, SurveyDescriptionPage } from "./pages";
import { SurveysContextProvider } from "./SurveysContext";

function App() {
  // const [number, setNumber] = useState(5);
  // const navigate = useNavigate();

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
                <SurveyDescriptionPage surveyId={0} />
              </SurveysContextProvider>
            }
          />
        </Routes>
      </NextUIProvider>
    </Router>
  );
}

export default App;
