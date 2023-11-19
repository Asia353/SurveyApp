import React from "react";
import { NextUIProvider } from "@nextui-org/react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";

import "./App.css";
import NavBar from "./components/NavBar";
import { AddSurveyPage } from "./pages";

function App() {
  // const [number, setNumber] = useState(5);
  // const navigate = useNavigate();

  return (
    <Router>
      <NextUIProvider>
        <NavBar />
        <Routes>
          <Route path="/add-survey" element={<AddSurveyPage />} />
          <Route path="/my-survey" element={<div>my survey</div>} />
        </Routes>
      </NextUIProvider>
    </Router>
  );
}

export default App;
