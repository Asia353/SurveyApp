import React, { useEffect } from "react";
import { Button } from "@nextui-org/react";

import { useSurveyContext } from "../../SurveysContext";
import SurveyView from "./SurveyView";

function SurveyListView() {
  const surveysContext = useSurveyContext();

  const add = () => {
    const surveyTest = { name: "Ankieta", id: 213, questions: [] };
    surveysContext.addSurveyToList(surveyTest);
  };

  //   useEffect(() => {
  //     console.log("djlasj");
  //     const surveyTest = { name: "Ankieta", id: 213, questions: [] };
  //     surveysContext.addSurveyToList(surveyTest);
  //   }, []);

  return (
    <div className="flex flex-col  w-full gap-2">
      {surveysContext.surveysList.map((element) => {
        return <SurveyView survey={element} />;
      })}
      <Button className="mt-4 w-10 self-end" onClick={add}>
        ADD
      </Button>
    </div>
  );
}

export default SurveyListView;
