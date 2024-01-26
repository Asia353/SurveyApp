import React from "react";
import QuestionItem from "./mySurveys/QuestionItem";
import { useSurveyContext } from "../SurveysContext";
import { Question, QuestionType, Survey } from "../types";
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
    type: QuestionType,
    options: string[],
  ) => void;
  edit: boolean;
}) {
  return (
    <div>
      <div className=" justify-center gap-2 flex flex-col">
        {questionsList.map((question, index) => {
          if (!edit)
            return (
              <QuestionItem
                key={`${question.description} ${question.id} ${question.id}`}
                item={question}
                index={index}
              />
            );
          return (
            <QuestionItemEdit
              key={`${question.description} ${question.id}`}
              item={question}
              index={index}
              deleteQuestion={deleteQuestion}
              saveEditedQuestion={saveEditedQuestion}
            />
          );
        })}
      </div>
    </div>
  );
}

export default QuestionListView;
