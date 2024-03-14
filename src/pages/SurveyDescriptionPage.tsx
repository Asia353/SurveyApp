import { Card, CardHeader, Input } from "@nextui-org/react";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import "./Page.css";
import QuestionListView from "../features/QuestionsListView";
import ActionButton from "../components/Button/ActionButton";
import EditSurvey from "../features/addSurvey/EditSurvey";
import { useSurveyContext } from "../contexts/SurveysContext";
import { useUserContext } from "../contexts/UserContext";

function Page() {
  const context = useSurveyContext();
  const { currentUser } = useUserContext();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const surveyId = String(searchParams.get("surveyid"));
  const [isEdit, setIsEdit] = useState(false);
  const [editSurveyName, setEditSurveyName] = useState(false);

  const currentSurvey = context.surveysList.find(
    (element) => element.id === surveyId,
  );
  const toggleEdit = () => {
    setIsEdit((edit) => !edit);
  };
  const toggleEditSurveyName = () => {
    setEditSurveyName((edit) => !edit);
  };

  const [newSurveyName, setNewSurveyName] = useState(currentSurvey?.name);

  // const delQuestion = (questionId: number) => {
  //   context.delQuestionFromList(surveyId - 1, questionId);
  // };

  const [surveyQuestions] = useState(currentSurvey?.questions);

  const [surveyName] = useState(currentSurvey?.name);

  return (
    <div>
      {surveyName && surveyQuestions ? (
        // <div className="flex flex-col items-center justify-center p-8">
        //   <Card className="ml-3/12 mr-3/12 p-7">\
        <div className="flex flex-col items-center justify-center p-4 sm:px-4 md:px-20 lg:px-48">
          <Card className="p-7 w-full" style={{ minWidth: 300, maxWidth: 600 }}>
            {!isEdit ? (
              <>
                <CardHeader className="mb-7 p-0 flex flex-row justify-between">
                  {currentSurvey?.name}
                  {!currentSurvey?.published && (
                    <ActionButton
                      actionIcon="Edit"
                      onClickFunction={toggleEdit}
                    />
                  )}
                </CardHeader>
                <QuestionListView
                  questionListViewProp={{
                    questionsList: surveyQuestions,
                    editable: false,
                    deleteQuestion: () => {},
                    saveEditedQuestion: () => {},
                  }}
                />
              </>
            ) : (
              <>
                <CardHeader className="mb-7 p-0 flex flex-row justify-between">
                  {editSurveyName ? (
                    <Input
                      className="m-0"
                      value={newSurveyName}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setNewSurveyName(e.target.value);
                      }}
                      onBlur={() => toggleEditSurveyName()}
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === "Enter") toggleEditSurveyName();
                      }}
                    />
                  ) : (
                    <div
                      className="flex flex-row"
                      role="button"
                      tabIndex={0}
                      onFocus={() => toggleEditSurveyName()}
                    >
                      <p className="mr-2">Name: </p>
                      <p>{newSurveyName}</p>
                    </div>
                  )}
                  {!currentSurvey?.published && (
                    <div className="pl-4">
                      <ActionButton
                        actionIcon="Edit"
                        onClickFunction={toggleEdit}
                      />
                    </div>
                  )}
                </CardHeader>
                <EditSurvey
                  key={`${surveyName}`}
                  editSurveyProp={{
                    surveyName,
                    surveyId,
                    userId: currentUser.userId,
                    surveyQuestions,
                    saveFunction: context.updateSurvey,
                  }}
                />
              </>
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
