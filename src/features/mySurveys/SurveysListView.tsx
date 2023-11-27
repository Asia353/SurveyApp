import React, { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";

import { useSurveyContext } from "../../SurveysContext";
import SurveyView from "./SurveyView";
import { SurveyDescriptionPage } from "../../pages";

function SurveyListView() {
  const surveysContext = useSurveyContext();

  const add = () => {
    const surveyTest = { name: "Ankieta", id: 213, questions: [] };
    surveysContext.addSurveyToList(surveyTest);
  };

  const [description, setDescription] = useState(false);
  const [descriptionElementId, setDescriptionElementId] = useState(-1);

  //   useEffect(() => {
  //     console.log("djlasj");
  //     const surveyTest = { name: "Ankieta", id: 213, questions: [] };
  //     surveysContext.addSurveyToList(surveyTest);
  //   }, []);

  return (
    <div className="flex flex-col  w-full gap-2">
      {surveysContext.surveysList.map((element, index) => {
        if (descriptionElementId === index)
          return <SurveyDescriptionPage surveyId={index} />;
        return (
          <SurveyView
            survey={element}
            id={index}
            setDescription={setDescription}
            setDescriptionElementId={setDescriptionElementId}
          />
        );
      })}
    </div>
  );
}

export default SurveyListView;
