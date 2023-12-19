import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";
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
  const changeEdit = () => {
    setIsEdit(!isEdit);
  };

  // const delQuestion = (questionId: number) => {
  //   context.delQuestionFromList(surveyId - 1, questionId);
  // };

  const [surveyQuestions, setSurveyQuestions] = useState(
    currentSurvey?.questions,
    // context.surveysList[surveyId - 1].questions,
  );

  const getNewId = () => {
    return surveyId;
  };

  const [surveyName, setSurveyName] = useState(
    // context.surveysList[surveyId - 1].name,
    currentSurvey?.name,
  );

  return (
    <div>
      {surveyName && surveyQuestions ? (
        <div className="flex flex-col items-center justify-center p-8">
          <Card className="survey-component p-7">
            <CardHeader className="mb-7 p-0 flex flex-row justify-between">
              {currentSurvey?.name}
              {!currentSurvey?.published && (
                <ActionButton actionIcon="Edit" onClickFunction={changeEdit} />
              )}
            </CardHeader>
            {!isEdit ? (
              <QuestionListView
                questionsList={surveyQuestions}
                // questionsList={context.surveysList[surveyId - 1].questions}
                edit={false}
                deleteQuestion={() => {}}
                saveEditedQuestion={() => {}}
              />
            ) : (
              <EditSurvey
                // questionList={context.surveysList[surveyId - 1].questions}
                key={`${surveyName}`}
                surveyName={surveyName}
                surveyId={surveyId}
                surveyQuestions={surveyQuestions}
                getNewId={() => 0}
                saveFunction={context.updateSurvey}
              />
            )}

            {/* <Button onclick={save}>SAVE</Button> */}
          </Card>
        </div>
      ) : (
        <p>Page not found</p>
      )}
    </div>
  );
}

export default Page;
