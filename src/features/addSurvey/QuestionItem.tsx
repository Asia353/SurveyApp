/* eslint-disable @typescript-eslint/no-unused-expressions */
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Select,
  SelectItem,
  Tooltip,
} from "@nextui-org/react";
import React, { useState } from "react";
import { Back } from "iconsax-react";

import { Question } from "../../types";
import ActionButton from "./ActionButton";
import OneAnswer from "./OneAnswer";
import { typesList } from "./QuestionForm";
import AnswersAdding from "./AnswersAdding";

function QuestionItem({
  item,
  deleteQuestion,
  saveEditedQuestion,
  printValues,
  index,
}: {
  item: Question;
  deleteQuestion: (id: number) => void;
  saveEditedQuestion: (
    id: number,
    description: string,
    type: string,
    options: string[],
  ) => void;
  printValues: () => void;
  index: number;
}) {
  const [showDetails, setShowDetails] = useState(false);
  const [editQuestion, setEditQuestion] = useState(false);

  const [newDescription, setNewDescription] = useState(item.description);
  const [newType, setNewType] = useState(item.type);
  const [newOptions, setNewOptions] = useState(item.options);

  function deleteItem() {
    deleteQuestion(index);
  }

  // function editItem() {
  //   console.log("Jestem w edit item");
  // }

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
    // console.log(newOptions);
  }

  // function handleEditButtonClick() {}

  function handleSaveButtonClick() {
    // console.log(newDescription, newType, newOptions);
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
    // setOptions((prevList) => prevList.filter((element, index) => index !== id));
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
    <Card shadow="sm" className="p-2 qusetion-component">
      <CardBody className="flex flex-row">
        <div className=" self-center">
          {item.id}. {newDescription}
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
            {/* {newOptions.map((answer, idx) => (
              <OneAnswer answer={answer} />
            ))} */}
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
            {/* <Button className="min-w-0 p-2" onClick={printValues}>
              pr
            </Button> */}
          </div>
        </CardFooter>
      )}
    </Card>
  );
}

export default QuestionItem;
