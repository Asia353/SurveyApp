import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import "./Page.css";
import { useSurveyContext } from "../SurveysContext";
import QuestionListView from "../features/QuestionsListView";
import ActionButton from "../components/Button/ActionButton";
import EditSurvey from "../features/addSurvey/EditSurvey";
import { Survey } from "../types";

function Page() {
  const context = useSurveyContext();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const surveyId = Number(searchParams.get("surveyid"));
  const [isEdit, setIsEdit] = useState(false);

  const changeEdit = () => {
    setIsEdit(!isEdit);
  };

  const delQuestion = (questionId: number) => {
    context.delQuestionFromList(surveyId - 1, questionId);
  };

  const [surveyQuestions, setSurveyQuestions] = useState(
    context.surveysList.find((element) => element.id === surveyId)?.questions,
  );

  const getNewId = () => {
    return surveyId;
  };

  const [surveyName, setSurveyName] = useState(
    context.surveysList.find((element) => element.id === surveyId)?.name,
  );

  return (
    <div>
      {surveyName && surveyQuestions ? (
        <div className="flex flex-col items-center justify-center p-8">
          <Card className="survey-component p-7">
            <CardHeader className="mb-7 p-0 flex flex-row justify-between">
              {context.surveysList[surveyId - 1]?.name}
              <ActionButton actionIcon="Edit" onClickFunction={changeEdit} />
            </CardHeader>
            {!isEdit ? (
              <QuestionListView
                questionsList={context.surveysList[surveyId - 1].questions}
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
                getNewId={getNewId}
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
