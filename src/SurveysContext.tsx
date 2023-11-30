import React, { useContext, useMemo, useState } from "react";
import { Survey, Question } from "./types";

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
  const surveyTest = {
    name: "SurveyTest",
    id: 1,
    questions: [
      {
        description: "Q1",
        type: "one option",
        id: 1,
        options: ["a1", "a2", "a3"],
      },
      {
        description: "Q2",
        type: "more option",
        id: 2,
        options: ["a11", "a22", "a33"],
      },
      {
        description: "Q3",
        type: "open",
        id: 3,
        options: [],
      },
    ],
  };
  const [surveysList, setSurveysList] = useState<Survey[]>([surveyTest]);

  const contextValue = useMemo(() => {
    function addSurveyToList(newSurvey: Survey) {
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
