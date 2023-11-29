import { Card, CardBody, CardHeader } from "@nextui-org/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./Page.css";
import { useSurveyContext } from "../SurveysContext";
import QuestionListView from "../features/QuestionsListView";
// import QuestionListView from "../features/QuestionsListView";

function Page({ surveyId }: { surveyId: number }) {
  const context = useSurveyContext();
  const [survey, setSurvey] = useState(context.surveysList[surveyId]);
  // const [showDescription, setShowDescription] = useState(false);

  const delQuestion = (questionId: number) => {};

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <Card className="survey-component p-7">
        <CardHeader className="mb-7 p-0">{survey.name}</CardHeader>
        {/* <QuestionListView
          questionList={survey.questions}
          edit={false}
          deleteQuestion={() => {}}
          saveEditedQuestion={() => {}}
        /> */}
      </Card>
    </div>
  );
}

export default Page;
