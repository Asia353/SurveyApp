import React, { useContext, useState } from "react";
import { Add } from "iconsax-react";

import "./Page.css";
import { Button, Card, CardHeader, Input } from "@nextui-org/react";
import { QuestionForm, QuestionItemEdit } from "../features";
import { Question } from "../types";
import { useSurveyContext } from "../SurveysContext";
import QuestionItem from "../features/mySurveys/QuestionItem";
import QuestionListView from "../features/QuestionsListView";

function Page() {
  const edit = true;

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

  const surveysContext = useSurveyContext();

  const [newQuestion] = useState<Question>({
    description: "",
    type: "",
    id: 0,
    options: [],
  });

  const [questionEditorAvaliable, setQuestionEditorAvaliable] = useState(false);
  const [surveyNameEditorAvaliable, setSurveyNameEditorAvaliable] =
    useState(false);
  const [surveyName, setSurveyName] = useState("New Survey");

  function addSurvey() {
    const newId = surveysContext.surveysList.length + 1;
    const newSurvey = { name: surveyName, id: newId, questions: questionsList };
    surveysContext.addSurveyToList(newSurvey);
  }

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

    setQuestionEditorAvaliable(false);

    // setNewQuestion({ description: " ", type: " ", id: 0, options: [] });
  }

  function deleteQuestion(id: number) {
    setQuestionsList((prevList) =>
      prevList.filter((element, index) => index !== id),
    );
  }

  function saveEditedQuestion(
    questionId: number,
    newDescription: string,
    newType: string,
    newOptions: string[],
  ) {
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
  }

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <Card className="survey-component p-7">
        <CardHeader className="mb-7 p-0">
          {surveyNameEditorAvaliable ? (
            <Input
              className="m-0"
              value={surveyName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setSurveyName(e.target.value);
              }}
              onBlur={() => setSurveyNameEditorAvaliable(false)}
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter") setSurveyNameEditorAvaliable(false);
              }}
            />
          ) : (
            <div
              className="flex flex-row"
              role="button"
              tabIndex={0}
              onFocus={() => setSurveyNameEditorAvaliable(true)}
            >
              <p className="mr-2">Name: </p>
              <p>{surveyName}</p>
            </div>
          )}
        </CardHeader>
        <div className="justify-center gap-2 flex flex-col mb-4">
          {/* {questionsList.map((item, index) => ( */}
          <QuestionListView
            questionsList={questionsList}
            // id={index}
            deleteQuestion={deleteQuestion}
            saveEditedQuestion={saveEditedQuestion}
            edit={edit}
          />
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
              <Add size="28" color="#71717A" variant="Linear" />
            </Button>
            {questionEditorAvaliable && (
              <QuestionForm addQuestion={addQuestion} question={newQuestion} />
            )}
            <Button className="mt-4" onClick={addSurvey}>
              SAVE SURVEY
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default Page;
