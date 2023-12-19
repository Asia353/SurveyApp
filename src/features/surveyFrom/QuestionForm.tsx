import React from "react";
import { Question } from "../../types";
import ManyOptionsForm from "./ManyOptionsForm";
import OneOptionForm from "./OneOptionForm";
import OpenForm from "./OpenForm";

function QuestionForm({
  question,
  index,
  updateAnserws,
}: {
  question: Question;
  index: number;
  updateAnserws: (questionId: number, newAnswers: string[]) => void;
}) {
  return (
    <div className="p-7">
      <p className="m-0 p-0 mb-7">
        {question.id}. {question.description}
      </p>
      {question.type === "many options" && (
        <ManyOptionsForm
          key={question.description}
          question={question}
          updateAnserws={updateAnserws}
        />
      )}
      {question.type === "one option" && (
        <OneOptionForm
          key={question.description}
          question={question}
          updateAnserws={updateAnserws}
        />
      )}
      {question.type === "open" && (
        <OpenForm
          key={question.description}
          question={question}
          updateAnserws={updateAnserws}
        />
      )}
    </div>
  );
}

export default QuestionForm;
