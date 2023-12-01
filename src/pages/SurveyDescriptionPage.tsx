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

  const changeEdit = () => {
    setIsEdit(!isEdit);
  };

  const delQuestion = (questionId: number) => {
    context.delQuestionFromList(surveyId - 1, questionId);
  };

  const [newQuestionList, setNewQuestionList] = useState(
    context.surveysList.find((element) => element.id === surveyId)?.questions,
  );

  const [newId, seNewId] = useState(
    context.surveysList.find((element) => element.id === surveyId)?.id,
  );

  const [newName, setNewName] = useState(
    context.surveysList.find((element) => element.id === surveyId)?.name,
  );

  const save = () => {};

  return (
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
          // <EditSurvey
          //   // questionList={context.surveysList[surveyId - 1].questions}
          //   surveyName={context.surveysList[surveyId - 1].name}
          //   setSurvey={}
          //   saveFunction={() => {}}
          // />
          <p>{surveyId - 1}</p>
          // <>{console.log("ds")}</>
          // <QuestionListView
          //   questionsList={context.surveysList[surveyId - 1].questions}
          //   edit={isEdit}
          //   deleteQuestion={delQuestion}
          //   saveEditedQuestion={() => {}}
          // />
        )}

        {/* <Button onclick={save}>SAVE</Button> */}
      </Card>
    </div>
  );
}

export default Page;
