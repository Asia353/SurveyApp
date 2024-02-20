import React from "react";
import { Question, QuestionType } from "../../types";
import ManyOptionsForm from "./ManyOptionsForm";
import OneOptionForm from "./OneOptionForm";
import OpenForm from "./OpenForm";

function QuestionForm({
  question,
  // index,
  updateAnswers,
}: {
  question: Question;
  // index: number;
  updateAnswers: (questionId: number, newAnswers: string[]) => void;
}) {
  return (
    <div className="p-7">
      <p className="m-0 p-0 mb-7">
        {question.id}. {question.description}
      </p>
      {question.type === QuestionType.ManyOptions && (
        <ManyOptionsForm
          key={question.description}
          questionId={question.id}
          options={question.options}
          updateAnswers={updateAnswers}
        />
      )}
      {question.type === QuestionType.OneOption && (
        <OneOptionForm
          key={question.description}
          questionId={question.id}
          options={question.options}
          updateAnswers={updateAnswers}
        />
      )}
      {question.type === QuestionType.Open && (
        <OpenForm
          key={question.description}
          questionId={question.id}
          options={question.options}
          updateAnswers={updateAnswers}
        />
      )}
    </div>
  );
}

export default QuestionForm;
