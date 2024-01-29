import React, { useContext, useEffect, useMemo, useState } from "react";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { database } from "./firebase-config";
import { Survey, Question } from "./types";
import * as FirebaseFunctions from "./FirebaseFunctions";

type SurveysContextType = {
  surveysList: Survey[];
  addSurveyToList: (newSurvey: Survey) => void;
  updateSurvey: (survey: Survey) => void;
  publishSurvey: (surveyIndex: number) => void;
};

const surveysContextInitValue = {
  surveysList: [],
  addSurveyToList: () => {},
  updateSurvey: () => {},
  publishSurvey: () => {},
  // updateSurveyList: () => {},
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

  useEffect(() => {
    const asyncFunction = async () => {
      setSurveysList(await FirebaseFunctions.loadSurveysFromFirestore());
    };
    asyncFunction();
  }, []);

  const contextValue = useMemo(() => {
    function addSurveyToList(newSurvey: Survey) {
      setSurveysList((list) => [...list, newSurvey]);
      FirebaseFunctions.writeSurveyToFirestore(newSurvey);
    }

    // function delQuestionFromList(surveyId: number, questionId: number) {
    //   // poxniej pewnie lepiej zamias sIndex i qIndex używać survey.id i question.id
    //   // console.log(surveyId);
    //   setSurveysList((list) =>
    //     list.map((survey, sIndex) => {
    //       if (sIndex === surveyId) {
    //         return {
    //           ...survey,
    //           questions: survey.questions.filter(
    //             (question, qIndex) => qIndex !== questionId,
    //           ),
    //         };
    //       }
    //       return survey;
    //     }),
    //   );
    // }

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
      FirebaseFunctions.modifySurveyQuestion(survey);
    }

    function publishSurvey(surveyId: number) {
      setSurveysList((list) =>
        list.map((currentSurvey) =>
          currentSurvey.id === surveyId
            ? {
                ...currentSurvey,
                published: true,
              }
            : currentSurvey,
        ),
      );
    }

    return {
      surveysList,
      addSurveyToList,
      updateSurvey,
      publishSurvey,
    };
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
  return context;
}
