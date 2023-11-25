import React, { useState } from "react";
import { Card, CardHeader, Input } from "@nextui-org/react";

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
      </Card>
    </div>
  );
}

export default Page;
