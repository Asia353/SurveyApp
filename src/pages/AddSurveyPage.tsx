import React, { useContext, useState } from "react";

import "./Page.css";
import { Card } from "@nextui-org/react";

import { Question, Survey } from "../types";
import { useSurveyContext } from "../SurveysContext";
import { EditSurvey } from "../features";

function Page() {
  const surveysContext = useSurveyContext();

  const newId = () => {
    if (surveysContext.surveysList.length)
      return surveysContext.surveysList.length + 1;
    return 1;
  };

  const [surveyName, setSurveyName] = useState("New Survey");
  const [surveyId, setSurveyId] = useState(newId());
  const [surveyOptions, setSurveyOptions] = useState<Question[]>([]);

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <Card className="survey-component p-7">
        <EditSurvey
          key={`${surveyName}`}
          surveyName={surveyName}
          surveyId={surveyId}
          surveyQuestions={surveyOptions}
          getNewId={newId}
          saveFunction={surveysContext.addSurveyToList}
        />
      </Card>
    </div>
  );
}

export default Page;
