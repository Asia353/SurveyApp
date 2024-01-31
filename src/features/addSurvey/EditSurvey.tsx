import React, { useState } from "react";
import { Add } from "iconsax-react";
import { Link } from "react-router-dom";

// import "./Page.css";
import { Button, CardHeader, Input } from "@nextui-org/react";
import { Question, QuestionType, Survey } from "../../types";
import QuestionListView from "../QuestionsListView";
import QuestionForm from "./QuestionForm";

type EditSurveyProp = {
  surveyName: string;
  surveyId: number;
  surveyQuestions: Question[];
  saveFunction: (survey: Survey) => void;
};
function EditSurvey({ editSurveyProp }: { editSurveyProp: EditSurveyProp }) {
  const editSurvey = true;
  const [newQuestionsList, setNewQuestionsList] = useState<Question[]>(
    editSurveyProp.surveyQuestions,
  );
  const [newSurveyName, setNewSurveyName] = useState(editSurveyProp.surveyName);

  const [newQuestion] = useState<Question>({
    description: "",
    type: QuestionType.OneOption,
    id: 0,
    options: [],
  });

  const [questionAddingFormAvaliable, setQuestionAddingFormAvaliable] =
    useState(false);
  const [surveyNameEditorAvaliable, setSurveyNameEditorAvaliable] =
    useState(false);

  function addQuestion(question: Question) {
    let newQustionId = question.id;
    if (question.id === 0)
      newQustionId =
        newQuestionsList.length > 0
          ? newQuestionsList[newQuestionsList.length - 1].id + 1
          : 1;

    setNewQuestionsList([
      ...newQuestionsList,
      {
        description: question.description,
        type: question.type,
        id: newQustionId,
        options: question.options,
      },
    ]);

    setQuestionAddingFormAvaliable(false);
  }

  function deleteQuestion(delElementId: number) {
    setNewQuestionsList((prevList) =>
      prevList.filter((element, index) => index !== delElementId),
    );
  }

  function saveSurvey() {
    editSurveyProp.saveFunction({
      name: newSurveyName,
      id: editSurveyProp.surveyId,
      questions: newQuestionsList,
      published: false,
    });
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
          questionListViewProp={{
            questionsList: newQuestionsList,
            deleteQuestion,
            saveEditedQuestion,
            editable: editSurvey,
          }}
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
              setQuestionAddingFormAvaliable(!questionAddingFormAvaliable)
            }
          >
            <Add size="28" color="#71717A" variant="Linear" />
          </Button>
          {questionAddingFormAvaliable && (
            <QuestionForm
              questionProp={{ addQuestion, question: newQuestion }}
            />
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
