import { Card, CardBody, CardHeader } from "@nextui-org/react";
import React, { useState } from "react";
import "./Page.css";
import { useSurveyContext } from "../SurveysContext";
import ActionButton from "../features/addSurvey/ActionButton";
import QuestionItem from "../features/mySurveys/QuestionItem";

function Page({ surveyId }: { surveyId: number }) {
  const context = useSurveyContext();
  const [survey, setSurvey] = useState(context.surveysList[surveyId]);
  // const [showDescription, setShowDescription] = useState(false);

  return (
    // <div className="flex flex-col items-center justify-center p-8">
    <div>
      <Card>
        <CardHeader>{survey.name}</CardHeader>
        <CardBody className="flex flex-col gap-2">
          {survey.questions.map((question, index) => {
            return <QuestionItem item={question} index={index} />;
          })}
        </CardBody>
      </Card>
    </div>
  );
}

export default Page;
