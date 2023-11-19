import { Input } from "@nextui-org/react";
import React from "react";
import { Question } from "../../pages/AddSurveyPage";
// dla każdego z elementów new question osobny state
function QuestionForm({
  addQuestion,
  question,
  setNewQuestion,
}: {
  addQuestion: () => void;
  question: Question;
  setNewQuestion: (question: Question) => void;
}) {
  return (
    <div className="flex flex-col gap-2 mt-4 mb-4">
      {/* <div>Jestem w question form</div> */}
      <Input
        type="text"
        label="Question description"
        value={question?.description}
        onChange={(e) => {
          setNewQuestion({
            ...question,
            description: e.target.value,
          });
        }}
      />
      <Input
        type="text"
        label="Type"
        value={question?.type}
        onChange={(e) => {
          setNewQuestion({
            ...question,
            type: e.target.value,
          });
        }}
      />
      <Input
        type="text"
        label="Option"
        // value={question?.options}
        onChange={(e) => {
          setNewQuestion({
            ...question,
            options: [...question.options, e.target.value],
          });
        }}
      />
    </div>
  );
}

export default QuestionForm;
