import React from "react";
import { Question } from "../../types";
import ManyOptionsForm from "./ManyOptionsForm";
import OneOptionForm from "./OneOptionForm";
import OpenForm from "./OpenForm";

function QuestionForm({ question }: { question: Question }) {
  return (
    <div className="p-7">
      <p className="m-0 p-0 mb-7">
        {question.id}. {question.description}
      </p>
      {question.type === "many options" && (
        <ManyOptionsForm key={question.description} question={question} />
      )}
      {question.type === "one option" && (
        <OneOptionForm key={question.description} question={question} />
      )}
      {question.type === "open" && (
        <OpenForm key={question.description} question={question} />
      )}
    </div>
  );
}

export default QuestionForm;
