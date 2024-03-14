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
    <div className="flex flex-col items-center justify-center p-4 sm:px-4 md:px-20 lg:px-48">
      <Card className="p-7 w-full" style={{ minWidth: 300, maxWidth: 600 }}>
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
