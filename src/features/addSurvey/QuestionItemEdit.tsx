/* eslint-disable @typescript-eslint/no-unused-expressions */
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Select,
  SelectItem,
} from "@nextui-org/react";
import React, { useState } from "react";
import { Back } from "iconsax-react";

import { Question, QuestionType } from "../../types";
import ActionButton from "../../components/Button/ActionButton";
import OneAnswer from "./OneAnswer";
import { questionTypeList } from "./QuestionForm";
import AnswersAdding from "./AnswersAdding";

type QuestionItemEditProp = {
  item: Question;
  index: number;
  deleteQuestion: (id: number) => void;
  saveEditedQuestion: (
    id: number,
    description: string,
    type: QuestionType,
    options: string[],
  ) => void;
};
function QuestionItemEdit({
  questionItemEditProp,
}: {
  questionItemEditProp: QuestionItemEditProp;
}) {
  const [showDetails, setShowDetails] = useState(false);
  const [editQuestion, setEditQuestion] = useState(false);

  const [newDescription, setNewDescription] = useState(
    questionItemEditProp.item.description,
  );
  const [newType, setNewType] = useState(questionItemEditProp.item.type);
  const [newOptions, setNewOptions] = useState(
    questionItemEditProp.item.options,
  );

  function deleteItem() {
    questionItemEditProp.deleteQuestion(questionItemEditProp.index);
  }

  function toggleDetails() {
    setEditQuestion(false);
    setShowDetails(!showDetails);
  }

  function toggleEdit() {
    setShowDetails(false);
    setEditQuestion(!editQuestion);
  }

  function editType(newValue: string) {
    if (newValue === "one option") setNewType(QuestionType.OneOption);
    else if (newValue === "many options") setNewType(QuestionType.ManyOptions);
    else {
      setNewType(QuestionType.Open);
      setNewOptions([]);
    }
  }

  function handleSaveButtonClick() {
    questionItemEditProp.saveEditedQuestion(
      questionItemEditProp.index,
      newDescription,
      newType,
      newOptions,
    );
    toggleDetails();
  }

  function handleBackButtonClick() {
    setNewDescription(questionItemEditProp.item.description);
    setNewType(questionItemEditProp.item.type);
    setNewOptions(questionItemEditProp.item.options);
  }

  function deleteAnswerFromList(id: number) {
    setNewOptions((list) => list.filter((element, idx) => idx !== id));
  }

  function addAnswerToList(newValue: string) {
    setNewOptions((list) => [...list, newValue]);
  }

  function editAnswer(id: number, newValue: string) {
    setNewOptions((prevOptions) =>
      prevOptions.map((option, idx) => (idx === id ? newValue : option)),
    );
  }

  return (
    <Card
      shadow="sm"
      // onPress={details}
      // onKeyDown={() => console.log("d")}
      // isPressable
    >
      <CardBody className="flex flex-row p-5">
        <div className=" self-center">
          <p className=" text-medium">
            {questionItemEditProp.index + 1}. {newDescription}
          </p>
        </div>
        <div className=" ml-auto flex flex-row">
          {showDetails ? (
            <ActionButton
              actionIcon="ArrowUp2"
              onClickFunction={toggleDetails}
            />
          ) : (
            <ActionButton
              actionIcon="ArrowDown2"
              onClickFunction={toggleDetails}
            />
          )}
          <ActionButton actionIcon="Edit" onClickFunction={toggleEdit} />
          <ActionButton actionIcon="Trash" onClickFunction={deleteItem} />
        </div>
      </CardBody>

      {showDetails && (
        <CardFooter className="flex flex-col items-start">
          <p className="mb-3">Question type: {newType}</p>
          <div className="flex flex-col">
            {newOptions.map((answer) => (
              <OneAnswer answer={answer} key={answer} />
            ))}
          </div>
        </CardFooter>
      )}

      {editQuestion && (
        <CardFooter className="flex flex-col items-start">
          <div className="flex flex-row w-full">
            <p className="mb-3">Question type: </p>
            <Select
              label="Select question's type"
              selectedKeys={[newType]}
              onChange={(e) => editType(e.target.value)}
            >
              {questionTypeList.map((element) => (
                <SelectItem key={element} value={element}>
                  {element}
                </SelectItem>
              ))}
            </Select>
          </div>
          <div className=" mt-4 min-w-full">
            {newType !== QuestionType.Open && (
              <AnswersAdding
                answerProp={{
                  answersList: newOptions,
                  onDelete: deleteAnswerFromList,
                  onAdd: addAnswerToList,
                  onEdit: editAnswer,
                }}
              />
            )}
          </div>
          <div className="flex flex-row self-end mt-4 gap-2">
            <Button className="min-w-0 p-3" onClick={handleSaveButtonClick}>
              SAVE
            </Button>
            <Button className="min-w-0 p-2" onClick={handleBackButtonClick}>
              <Back size="20" color="#71717A" variant="Linear" />
            </Button>
          </div>
        </CardFooter>
      )}
    </Card>
  );
}

export default QuestionItemEdit;
