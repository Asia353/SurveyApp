import { Card, CardHeader } from "@nextui-org/react";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import "./Page.css";
import { useSurveyContext } from "../SurveysContext";
import QuestionListView from "../features/QuestionsListView";
import ActionButton from "../components/Button/ActionButton";
import EditSurvey from "../features/addSurvey/EditSurvey";

function Page() {
  const context = useSurveyContext();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const surveyId = Number(searchParams.get("surveyid"));
  const [isEdit, setIsEdit] = useState(false);

  const currentSurvey = context.surveysList.find(
    (element) => element.id === surveyId,
  );
  const toggleEdit = () => {
    setIsEdit((edit) => !edit);
  };

  // const delQuestion = (questionId: number) => {
  //   context.delQuestionFromList(surveyId - 1, questionId);
  // };

  const [surveyQuestions] = useState(currentSurvey?.questions);

  const [surveyName] = useState(currentSurvey?.name);

  return (
    <div>
      {surveyName && surveyQuestions ? (
        <div className="flex flex-col items-center justify-center p-8">
          <Card className="survey-component p-7">
            <CardHeader className="mb-7 p-0 flex flex-row justify-between">
              {currentSurvey?.name}
              {!currentSurvey?.published && (
                <ActionButton actionIcon="Edit" onClickFunction={toggleEdit} />
              )}
            </CardHeader>
            {!isEdit ? (
              <QuestionListView
                questionListViewProp={{
                  questionsList: surveyQuestions,
                  editable: false,
                  deleteQuestion: () => {},
                  saveEditedQuestion: () => {},
                }}
              />
            ) : (
              <EditSurvey
                key={`${surveyName}`}
                editSurveyProp={{
                  surveyName,
                  surveyId,
                  surveyQuestions,
                  saveFunction: context.updateSurvey,
                }}
              />
            )}
          </Card>
        </div>
      ) : (
        <p>Page not found</p>
      )}
    </div>
  );
}

export default Page;
