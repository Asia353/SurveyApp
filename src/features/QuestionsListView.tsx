import React from "react";
import QuestionItem from "./mySurveys/QuestionItem";
import { Question, QuestionType } from "../types";
import QuestionItemEdit from "./addSurvey/QuestionItemEdit";

type QuestionListViewProp = {
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
};
function QuestionListView({
  questionListViewProp,
}: {
  questionListViewProp: QuestionListViewProp;
}) {
  return (
    <div>
      <div className=" justify-center gap-2 flex flex-col">
        {questionListViewProp.questionsList.map((question, index) => {
          if (!questionListViewProp.edit)
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
              questionItemEditProp={{
                item: question,
                index,
                deleteQuestion: questionListViewProp.deleteQuestion,
                saveEditedQuestion: questionListViewProp.saveEditedQuestion,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

export default QuestionListView;
