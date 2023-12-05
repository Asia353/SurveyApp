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

import { Question } from "../../types";
import ActionButton from "../../components/Button/ActionButton";
import OneAnswer from "./OneAnswer";
import { typesList } from "./QuestionForm";
import AnswersAdding from "./AnswersAdding";

function QuestionItemEdit({
  item,
  index,
  deleteQuestion,
  saveEditedQuestion,
}: {
  item: Question;
  index: number;
  deleteQuestion: (id: number) => void;
  saveEditedQuestion: (
    id: number,
    description: string,
    type: string,
    options: string[],
  ) => void;
}) {
  const [showDetails, setShowDetails] = useState(false);
  const [editQuestion, setEditQuestion] = useState(false);

  const [newDescription, setNewDescription] = useState(item.description);
  const [newType, setNewType] = useState(item.type);
  const [newOptions, setNewOptions] = useState(item.options);

  function deleteItem() {
    deleteQuestion(index);
  }

  function details() {
    setEditQuestion(false);
    setShowDetails(!showDetails);
  }

  function edit() {
    setShowDetails(false);
    setEditQuestion(!editQuestion);
  }

  function editType(newValue: string) {
    setNewType(newValue);
    if (newValue === "open") setNewOptions([]);
  }

  function handleSaveButtonClick() {
    saveEditedQuestion(index, newDescription, newType, newOptions);
    details();
  }

  function handleBackButtonClick() {
    setNewDescription(item.description);
    setNewType(item.type);
    setNewOptions(item.options);
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
      onPress={details}
      // onKeyDown={() => console.log("d")}
      isPressable
    >
      <CardBody className="flex flex-row p-5">
        <div className=" self-center">
          <p className=" text-medium">
            {item.id}. {newDescription}
          </p>
        </div>
        <div className=" ml-auto flex flex-row">
          {showDetails ? (
            <ActionButton actionIcon="ArrowUp2" onClickFunction={details} />
          ) : (
            <ActionButton actionIcon="ArrowDown2" onClickFunction={details} />
          )}
          <ActionButton actionIcon="Edit" onClickFunction={edit} />
          <ActionButton actionIcon="Trash" onClickFunction={deleteItem} />
        </div>
      </CardBody>

      {showDetails && (
        <CardFooter className="flex flex-col items-start">
          <p className="mb-3">Question type: {newType}</p>
          <div className="flex flex-col">
            {newOptions.map((answer, idx) => (
              <OneAnswer answer={answer} />
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
              {typesList.map((element) => (
                <SelectItem key={element} value={element}>
                  {element}
                </SelectItem>
              ))}
            </Select>
          </div>
          <div className=" mt-4 min-w-full">
            {newType !== "open" && (
              <AnswersAdding
                answersList={newOptions}
                deleteAnswerFromList={deleteAnswerFromList}
                addAnswerToList={addAnswerToList}
                editAnswer={editAnswer}
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
