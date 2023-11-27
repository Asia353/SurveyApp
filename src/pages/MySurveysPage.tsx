import React, { useState } from "react";
import { Button, Card, CardHeader, Input } from "@nextui-org/react";
import { Link } from "react-router-dom";

import "./Page.css";
import SurveyListView from "../features/mySurveys/SurveysListView";
import { useSurveyContext } from "../SurveysContext";

function Page() {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <Card className="survey-component p-7">
        <CardHeader className="mb-7 p-0">
          <p>My Survays</p>
        </CardHeader>
        <CardHeader className="m=0 p-0">
          <SurveyListView />
        </CardHeader>
        <Button className="mt-10" as={Link} to="/add-survey">
          ADD NEW SURVEY
        </Button>
      </Card>
    </div>
  );
}

export default Page;
