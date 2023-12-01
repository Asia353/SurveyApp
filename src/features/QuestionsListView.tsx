import React from "react";
import QuestionItem from "./mySurveys/QuestionItem";
import { useSurveyContext } from "../SurveysContext";
import { Question, Survey } from "../types";
import QuestionItemEdit from "./addSurvey/QuestionItemEdit";

function QuestionListView({
  questionsList,
  //   id,
  deleteQuestion,
  saveEditedQuestion,
  edit,
}: {
  questionsList: Question[];
  //   id: number;
  deleteQuestion: (id: number) => void;
  saveEditedQuestion: (
    id: number,
    description: string,
    type: string,
    options: string[],
  ) => void;
  edit: boolean;
}) {
  return (
    <div>
      {!edit ? (
        <div className=" justify-center gap-2 flex flex-col">
          {questionsList.map((question, index) => {
            return (
              <QuestionItem
                key={`${question.description}`}
                item={question}
                index={index}
              />
            );
          })}
        </div>
      ) : (
        <div className=" justify-center gap-2 flex flex-col">
          {questionsList.map((question, index) => {
            return (
              <QuestionItemEdit
                key={`${question.description}`}
                item={question}
                index={index}
                deleteQuestion={deleteQuestion}
                saveEditedQuestion={saveEditedQuestion}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default QuestionListView;
