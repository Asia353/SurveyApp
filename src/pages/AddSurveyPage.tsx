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

  function saveData(name: string, id: number, options: Question[]) {
    setSurveyName(name);
    setSurveyId(1);
    setSurveyOptions(options);
  }

  function addSurvey() {
    const newSurvey = {
      name: surveyName,
      id: surveyId,
      questions: surveyOptions,
    };
    surveysContext.addSurveyToList(newSurvey);
  }

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <Card className="survey-component p-7">
        <EditSurvey
          key={`${surveyName}`}
          surveyName={surveyName}
          surveyId={surveyId}
          surveyOptions={surveyOptions}
          // getNewId={newId}
          // setSurveyId={setSurveyId}
          // setSurveyName={setSurveyName}
          // setSyrveyOption={setSurveyOptions}
          saveFunction={surveysContext.addSurveyToList}
        />
      </Card>
    </div>
  );
}

export default Page;
