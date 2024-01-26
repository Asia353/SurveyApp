import React, { useContext, useState } from "react";
import { Add } from "iconsax-react";
import { Link } from "react-router-dom";

// import "./Page.css";
import { Button, Card, CardHeader, Input } from "@nextui-org/react";
import { Question, QuestionType, Survey } from "../../types";
import QuestionListView from "../QuestionsListView";
import QuestionForm from "./QuestionForm";

function EditSurvey({
  surveyName,
  surveyId,
  surveyQuestions,
  getNewId,
  saveFunction,
}: {
  surveyName: string;
  surveyId: number;
  surveyQuestions: Question[];
  getNewId: () => number;
  saveFunction: (survey: Survey) => void;
}) {
  const edit = true;
  const [newQuestionsList, setNewQuestionsList] =
    useState<Question[]>(surveyQuestions);
  const [newSurveyName, setNewSurveyName] = useState(surveyName);
  // const [newId] = useState(surveyId);

  const [newQuestion] = useState<Question>({
    description: "",
    type: QuestionType.OneOption,
    id: 0,
    options: [],
  });

  const [questionEditorAvaliable, setQuestionEditorAvaliable] = useState(false);
  const [surveyNameEditorAvaliable, setSurveyNameEditorAvaliable] =
    useState(false);

  function addQuestion(
    description: string,
    type: QuestionType,
    id: number,
    options: string[],
  ) {
    // setQuestionsList((x) => [...x, newQuestion]);

    let newQustionId = id;
    if (id === 0)
      newQustionId =
        newQuestionsList.length > 0
          ? newQuestionsList[newQuestionsList.length - 1].id + 1
          : 1;

    setNewQuestionsList([
      ...newQuestionsList,
      {
        description,
        type,
        id: newQustionId,
        options,
      },
    ]);

    setQuestionEditorAvaliable(false);

    // setNewQuestion({ description: " ", type: " ", id: 0, options: [] });
  }

  function deleteQuestion(delElementId: number) {
    setNewQuestionsList((prevList) =>
      prevList.filter((element, index) => index !== delElementId),
    );
  }

  function saveSurvey() {
    saveFunction({
      name: newSurveyName,
      id: surveyId,
      questions: newQuestionsList,
      published: false,
    });
    // setNewQuestionsList(surveyQuestions);
    // setNewSurveyName(surveyName);
  }

  function saveEditedQuestion(
    questionIndex: number,
    newDescription: string,
    newType: QuestionType,
    newOptions: string[],
  ) {
    setNewQuestionsList((prevList) =>
      prevList.map((element, index) =>
        index === questionIndex
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
    <>
      <CardHeader className="mb-7 p-0">
        {surveyNameEditorAvaliable ? (
          <Input
            className="m-0"
            value={newSurveyName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setNewSurveyName(e.target.value);
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
            <p>{newSurveyName}</p>
          </div>
        )}
      </CardHeader>
      <div className="justify-center gap-2 flex flex-col mb-4">
        {/* {questionsList.map((item, index) => ( */}
        <QuestionListView
          questionsList={newQuestionsList}
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
            onClick={() => setQuestionEditorAvaliable(!questionEditorAvaliable)}
          >
            <Add size="28" color="#71717A" variant="Linear" />
          </Button>
          {questionEditorAvaliable && (
            <QuestionForm addQuestion={addQuestion} question={newQuestion} />
          )}
          <Button
            as={Link}
            to="/my-surveys"
            className="mt-4"
            onClick={saveSurvey}
          >
            SAVE SURVEY
          </Button>
        </div>
      </form>
    </>
  );
}

export default EditSurvey;
