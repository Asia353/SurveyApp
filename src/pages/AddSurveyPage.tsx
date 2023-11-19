import React, { useState } from "react";
import "./AddSurveyPage.css";
import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import { QuestionItem, QuestionForm } from "../features";

// type AddSurveyPageProps = {};
export type Question = {
  description: string;
  type: string;
  id: number;
  options: string[];
};

function Page() {
  const [questionsList, setQuestionsList] = useState<Question[]>([
    { description: "Question 1", type: "open", id: 1, options: [] },
    { description: "Question 2", type: "open", id: 2, options: [] },
  ]);

  const [newQuestion, setNewQuestion] = useState<Question>({
    description: "",
    type: "",
    id: 0,
    options: [],
  });

  function addQuestion() {
    // setQuestionsList((x) => [...x, newQuestion]);

    setQuestionsList([
      ...questionsList,
      {
        description: newQuestion.description,
        type: newQuestion.description,
        id: questionsList[questionsList.length - 1].id + 1,
        options: newQuestion.options,
      },
    ]);

    setNewQuestion({ description: " ", type: " ", id: 0, options: [] });
  }

  return (
    <div className="page flex items-center justify-center">
      <Card className="survey-component">
        <CardHeader className="items-start">
          <p>Name: New survey</p>
        </CardHeader>
        <div className="questions-view-component justify-center gap-2 flex flex-col mb-4">
          {questionsList.map((item, index) => (
            <QuestionItem item={item} />
          ))}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="add-question-button-panel flex flex-col">
            <Button className="button self-end">+</Button>
            <QuestionForm
              addQuestion={addQuestion}
              question={newQuestion}
              setNewQuestion={setNewQuestion}
            />
            <Button className="button self-end" onPress={addQuestion}>
              SAVE
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default Page;
