import React, { useState } from "react";
import "./AddSurveyPage.css";
import { Button, Card, CardHeader } from "@nextui-org/react";
import { QuestionItem, QuestionForm } from "../features";

export type Question = {
  description: string;
  type: string;
  id: number;
  options: string[];
};

function Page() {
  const [questionsList, setQuestionsList] = useState<Question[]>([
    {
      description: "Question 1",
      type: "one option",
      id: 1,
      options: ["a1", "a2", "a3"],
    },
    {
      description: "Question 2",
      type: "many options",
      id: 2,
      options: ["a1", "a2", "a3"],
    },
  ]);

  const [newQuestion] = useState<Question>({
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
    if (id === 0)
      newId =
        questionsList.length > 0
          ? questionsList[questionsList.length - 1].id + 1
          : 0;

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

  // function setOpenQuestion(questionId: number) {
  //   setQuestionsList((prevList) =>
  //     prevList.map((element, index) =>
  //       index === questionId ? { ...element, option: [] } : element,
  //     ),
  //   );
  //   // setType(() => newType);
  // }

  function saveEditedQuestion(
    questionId: number,
    newDescription: string,
    newType: string,
    newOptions: string[],
  ) {
    // console.log(questionId, newDescription, newType, newOptions);

    setQuestionsList((prevList) =>
      prevList.map((element, index) =>
        index === questionId
          ? {
              ...element,
              description: newDescription,
              type: newType,
              options: newOptions,
            }
          : element,
      ),
    );
    // console.log("po zmianie:");
    // console.log(questionsList);
  }

  function printValues() {
    console.log("Print questions: ");
    console.log(questionsList);
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
              saveEditedQuestion={saveEditedQuestion}
              printValues={printValues}
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
