import React, { useState } from "react";
import "./AddSurveyPage.css";
import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import { QuestionItem, QuestionForm } from "../features";

type AddSurveyPageProps = {};
export type Question = { description: string; type: string };

function Page() {
  const [questionsList, setQuestionsList] = useState<Question[]>([
    { description: "Question 1", type: "open" },
    { description: "Question 2", type: "open" },
  ]);

  const [newQuestion, setNewQuestion] = useState<Question>();

  function addQuestion() {
    // setQuestionsList((x) => [...x, newQuestion]);
    if (newQuestion) setQuestionsList([...questionsList, newQuestion]);
    setNewQuestion({ description: " ", type: " " });
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
            <Input
              type="text"
              label="Question description"
              value={newQuestion?.description}
              onChange={(e) => {
                setNewQuestion({ description: e.target.value, type: "open" });
              }}
            />
            <Button className="button self-end" onPress={addQuestion}>
              +
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default Page;
