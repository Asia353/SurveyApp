import React, { useContext, useMemo, useState } from "react";
import { Survey } from "./types";

type SurveysContextType = {
  surveysList: Survey[];
  addSurveyToList: (newSurvey: Survey) => void;
  delQuestionFromList: (surveyId: number, questionId: number) => void;
  updateSurvey: (survey: Survey) => void;
};

const surveysContextInitValue = {
  surveysList: [],
  addSurveyToList: () => {},
  delQuestionFromList: () => {},
  updateSurvey: () => {},
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
      // console.log(newSurvey);
      setSurveysList((list) => [...list, newSurvey]);
    }

    function delQuestionFromList(surveyId: number, questionId: number) {
      // poxniej pewnie lepiej zamias sIndex i qIndex używać survey.id i question.id
      // console.log(surveyId);
      setSurveysList((list) =>
        list.map((survey, sIndex) => {
          if (sIndex === surveyId) {
            return {
              ...survey,
              questions: survey.questions.filter(
                (question, qIndex) => qIndex !== questionId,
              ),
            };
          }
          return survey;
        }),
      );
    }

    function updateSurvey(survey: Survey) {
      setSurveysList((list) =>
        list.map((currentSurvey) =>
          currentSurvey.id === survey.id
            ? {
                ...currentSurvey,
                questions: survey.questions,
                name: survey.name,
              }
            : currentSurvey,
        ),
      );
    }

    return { surveysList, addSurveyToList, delQuestionFromList, updateSurvey };
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
