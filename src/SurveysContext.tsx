import React, { useContext, useMemo, useState } from "react";
import { Survey } from "./types";

type SurveysContextType = {
  surveysList: Survey[];
  addSurveyToList: (newSurvey: Survey) => void;
};

const surveysContextInitValue = {
  surveysList: [],
  addSurveyToList: () => {},
};

const SurveysContext = React.createContext<SurveysContextType>(
  surveysContextInitValue,
);
// const SurveysContext = React.createContext<{
//   surveysList: Survey[];
//   addSurveyToList: (newSurvey: Survey) => void;
// }>({
//   surveysList: [],
//   addSurveyToList: () => {},
// });

export function SurveysContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [surveysList, setSurveysList] = useState<Survey[]>([]);

  function print(Name: string) {
    console.log(Name);
  }

  const contextValue = useMemo(() => {
    function addSurveyToList(newSurvey: Survey) {
      console.log(newSurvey);

      setSurveysList((list) => [...list, newSurvey]);
    }

    return { surveysList, addSurveyToList };
  }, [surveysList]);

  return (
    <SurveysContext.Provider value={contextValue}>
      {children}
    </SurveysContext.Provider>
  );
}

export function useSurveyContext() {
  const context = useContext(SurveysContext);
  if (context == null)
    throw new Error("must be used inside ToDoContextProvider");
  else return context;
}
