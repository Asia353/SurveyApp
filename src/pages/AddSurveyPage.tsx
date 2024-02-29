import React, { useId, useState } from "react";

import "./Page.css";
import { Card } from "@nextui-org/react";
import { Question } from "../types";
import { useSurveyContext } from "../contexts/SurveysContext";
import { EditSurvey } from "../features";
import { useUserContext } from "../contexts/UserContext";

function Page() {
  const surveysContext = useSurveyContext();
  const { currentUser } = useUserContext();
  const [surveyName] = useState("New Survey");
  const [surveyId] = useState(useId());
  const [surveyOptions] = useState<Question[]>([]);

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <Card className="survey-component p-7">
        <EditSurvey
          key={`${surveyName}`}
          editSurveyProp={{
            surveyName,
            surveyId,
            userId: currentUser.userId,
            surveyQuestions: surveyOptions,
            saveFunction: surveysContext.addSurveyToList,
          }}
        />
      </Card>
    </div>
  );
}

export default Page;
