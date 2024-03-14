import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Input,
  Select,
  SelectItem,
  useDisclosure,
} from "@nextui-org/react";
import React, { useState } from "react";
import { Back } from "iconsax-react";

import { Question, QuestionType } from "../../types";
import ActionButton from "../../components/Button/ActionButton";
import Answer from "./Answer";
import { questionTypeList } from "./QuestionForm";
import AnswersAdding from "./AnswersAdding";
import { ModalElement } from "../../components/ModalElement";

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
  const [editQuestionName, setEditQuestionName] = useState(false);

  const [newDescription, setNewDescription] = useState(
    questionItemEditProp.item.description,
  );
  const [newType, setNewType] = useState(questionItemEditProp.item.type);
  const [newOptions, setNewOptions] = useState(
    questionItemEditProp.item.options,
  );

  // function deleteItem() {
  //   questionItemEditProp.deleteQuestion(questionItemEditProp.index);
  // }

  function toggleDetails() {
    setEditQuestion(false);
    setShowDetails((show) => !show);
  }

  function toggleEdit() {
    setShowDetails(false);
    setEditQuestion((edit) => !edit);
  }

  const toggleEditQuestionName = () => {
    setEditQuestionName(!editQuestionName);
  };

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

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleOpen = () => {
    onOpen();
  };

  return (
    <Card shadow="sm">
      <CardBody className="flex flex-row p-5">
        <div className=" self-center">
          <p className=" text-medium">
            {questionItemEditProp.index + 1}.{" "}
            {questionItemEditProp.item.description}
          </p>
        </div>
        <div className=" ml-auto flex flex-row">
          <ActionButton
            actionIcon={showDetails ? "ArrowUp2" : "ArrowDown2"}
            onClickFunction={toggleDetails}
          />
          <ActionButton actionIcon="Edit" onClickFunction={toggleEdit} />
          <ActionButton
            actionIcon="Trash"
            onClickFunction={
              handleOpen
              // questionItemEditProp.deleteQuestion(questionItemEditProp.index)
            }
          />
          <ModalElement
            closeFunction={() =>
              questionItemEditProp.deleteQuestion(questionItemEditProp.index)
            }
            handleOpen={handleOpen}
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
          />
        </div>
      </CardBody>

      {showDetails && (
        <CardFooter className="flex flex-col items-start">
          <p className="mb-3">Question type: {newType}</p>
          <div className="flex flex-col">
            {newOptions.map((answer) => (
              <Answer answer={answer} key={answer} />
            ))}
          </div>
        </CardFooter>
      )}

      {editQuestion && (
        <CardFooter className="flex flex-col items-start">
          <Input
            className=""
            value={newDescription}
            label="Question description"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setNewDescription(e.target.value);
            }}
            onBlur={() => toggleEditQuestionName()}
            autoFocus
          />
          <Select
            className="mt-2"
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
