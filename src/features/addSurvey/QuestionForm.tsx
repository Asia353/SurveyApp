import { Input } from "@nextui-org/react";
import React from "react";
import { Question } from "../../pages/AddSurveyPage";

function QuestionForm({
  addQuestion,
  question,
}: {
  addQuestion: () => void;
  question: Question;
}) {
  return (
    <>
      <div>Jestem w question form</div>
      <Input
        type="text"
        label="Question description"
        // value={newQuestion?.description}
        onChange={(e) => {
          // setNewQuestion({ description: e.target.value, type: "open" });
        }}
      />
    </>
  );
}

export default QuestionForm;
