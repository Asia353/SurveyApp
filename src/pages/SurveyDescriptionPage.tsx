import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import "./Page.css";
import { useSurveyContext } from "../SurveysContext";
import QuestionListView from "../features/QuestionsListView";
// import QuestionListView from "../features/QuestionsListView";
import { Survey } from "../types";

function Page() {
  const context = useSurveyContext();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const surveyId = Number(searchParams.get("surveyid"));

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <Card className="survey-component p-7">
        <CardHeader className="mb-7 p-0">
          {context.surveysList[surveyId - 1]?.name}
        </CardHeader>
        <QuestionListView
          questionsList={context.surveysList[surveyId - 1].questions}
          edit={false}
          deleteQuestion={() => {}}
          saveEditedQuestion={() => {}}
        />
      </Card>
    </div>
  );
}

export default Page;
