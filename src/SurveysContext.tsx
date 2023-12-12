import React, { useContext, useEffect, useMemo, useState } from "react";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { database } from "./firebase-config";
import { Survey, Question } from "./types";

type SurveysContextType = {
  surveysList: Survey[];
  addSurveyToList: (newSurvey: Survey) => void;
  delQuestionFromList: (surveyId: number, questionId: number) => void;
  updateSurvey: (survey: Survey) => void;
  publishSurvey: (surveyIndex: number) => void;
  // upadteSurveyList: (surveyList: Survey[]) => void;
};

async function loadSurveysFromFirestore() {
  try {
    const surveysCollection = collection(database, "surveys");
    const surveysSnapshot = await getDocs(surveysCollection);

    const surveysList: Survey[] = surveysSnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: data.id,
        name: data.name,
        questions: data.questions || [],
        published: data.published || false,
      } as Survey;
    });

    console.log("Załadowano ankiety z Firestore:", surveysList);
    return surveysList;
  } catch (error) {
    console.error("Błąd podczas ładowania ankiet z Firestore:", error);
    return [];
  }
}

const surveysContextInitValue = {
  surveysList: [],
  addSurveyToList: () => {},
  delQuestionFromList: () => {},
  updateSurvey: () => {},
  publishSurvey: () => {},
  upadteSurveyList: () => {},
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
      setSurveysList(await loadSurveysFromFirestore());
    };
    asyncFunction();
  }, []);

  const contextValue = useMemo(() => {
    async function addSurveyToList(newSurvey: Survey) {
      // console.log(newSurvey);
      setSurveysList((list) => [...list, newSurvey]);

      await addDoc(collection(database, "surveys"), {
        name: newSurvey.name,
        id: newSurvey.id,
        published: newSurvey.published,
        questions: newSurvey.questions.map((question) => ({
          description: question.description,
          type: question.type,
          id: question.id,
          options: question.options,
        })),
      });
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

    function publishSurvey(surveyIndex: number) {
      setSurveysList((list) =>
        list.map((currentSurvey, index) =>
          index === surveyIndex
            ? {
                ...currentSurvey,
                published: true,
              }
            : currentSurvey,
        ),
      );
    }

    // function upadteSurveyList(newList: Survey[]) {
    //   setSurveysList(() => newList);
    // }

    return {
      surveysList,
      addSurveyToList,
      delQuestionFromList,
      updateSurvey,
      publishSurvey,
      // upadteSurveyList,
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
  else return context;
}
