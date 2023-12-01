import React, { useContext, useState } from "react";
import { Add } from "iconsax-react";

// import "./Page.css";
import { Button, Card, CardHeader, Input } from "@nextui-org/react";
import { Question, Survey } from "../../types";
import QuestionListView from "../QuestionsListView";
import QuestionForm from "./QuestionForm";

function EditSurvey({
  surveyName,
  surveyId,
  surveyOptions,
  saveFunction,
}: {
  surveyName: string;
  surveyId: number;
  surveyOptions: Question[];
  saveFunction: (survey: Survey) => void;
}) {
  const edit = true;
  const [newQuestionsList, setNewQuestionsList] =
    useState<Question[]>(surveyOptions);
  const [newSurveyName, setNewSurveyName] = useState(surveyName);
  const [newId] = useState(surveyId);

  const [newQuestion] = useState<Question>({
    description: "",
    type: "",
    id: 0,
    options: [],
  });

  const [questionEditorAvaliable, setQuestionEditorAvaliable] = useState(false);
  const [surveyNameEditorAvaliable, setSurveyNameEditorAvaliable] =
    useState(false);

  function addQuestion(
    description: string,
    type: string,
    id: number,
    options: string[],
  ) {
    // setQuestionsList((x) => [...x, newQuestion]);

    let newQustionId = id;
    if (id === 0)
      newQustionId =
        newQuestionsList.length > 0
          ? newQuestionsList[newQuestionsList.length - 1].id + 1
          : 0;

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

  function deleteQuestion(id: number) {
    setNewQuestionsList((prevList) =>
      prevList.filter((element, index) => index !== id),
    );
  }

  function saveSurvey() {
    saveFunction({
      name: newSurveyName,
      id: 1,
      questions: newQuestionsList,
    });
  }

  function saveEditedQuestion(
    questionId: number,
    newDescription: string,
    newType: string,
    newOptions: string[],
  ) {
    setNewQuestionsList((prevList) =>
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
          <Button className="mt-4" onClick={saveSurvey}>
            SAVE SURVEY
          </Button>
        </div>
      </form>
    </>
  );
}

export default EditSurvey;
