import React, { useState } from "react";
import "./AddSurveyPage.css";
import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import { QuestionItem, QuestionForm } from "../features";

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

  const [questionEditorAvaliable, setQuestionEditorAvaliable] = useState(false);

  function addQuestion(
    description: string,
    type: string,
    id: number,
    options: string[],
  ) {
    // setQuestionsList((x) => [...x, newQuestion]);

    let newId = id;
    if (id === 0) newId = questionsList[questionsList.length - 1].id + 1;

    setQuestionsList([
      ...questionsList,
      {
        description,
        type,
        id: newId,
        options,
      },
    ]);

    // setNewQuestion({ description: " ", type: " ", id: 0, options: [] });
  }

  function deleteQuestion(id: number) {
    setQuestionsList((prevList) =>
      prevList.filter((element, index) => index !== id),
    );
  }

  return (
    <div className="page flex items-center justify-center">
      <Card className="survey-component">
        <CardHeader className="items-start">
          <p>Name: New survey</p>
        </CardHeader>
        <div className="questions-view-component justify-center gap-2 flex flex-col mb-4">
          {questionsList.map((item, index) => (
            <QuestionItem
              item={item}
              deleteQuestion={deleteQuestion}
              index={index}
            />
          ))}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="add-question-button-panel flex flex-col">
            <Button
              className="button self-end"
              onClick={() =>
                setQuestionEditorAvaliable(!questionEditorAvaliable)
              }
            >
              +
            </Button>
            {questionEditorAvaliable && (
              <QuestionForm addQuestion={addQuestion} question={newQuestion} />
            )}
          </div>
        </form>
      </Card>
    </div>
  );
}

export default Page;
