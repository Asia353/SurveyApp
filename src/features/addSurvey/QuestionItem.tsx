/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Button, Card, CardBody, Tooltip } from "@nextui-org/react";
import React from "react";
import { Edit, Sun1, Trash } from "iconsax-react";

import { Question } from "../../pages/AddSurveyPage";

export function ActionButton({
  actionIcon,
  onClickFunction,
}: {
  actionIcon: string;
  onClickFunction: () => void;
}) {
  function icon() {
    const size = "16";
    const className = "m-1";
    if (actionIcon === "Trash") {
      return (
        <Tooltip content="delete" offset={10}>
          <Trash size={size} className={className} onClick={onClickFunction} />
        </Tooltip>
      );
    }
    if (actionIcon === "Edit") {
      return (
        <Tooltip content="edit">
          <Edit size={size} className={className} onClick={onClickFunction} />
        </Tooltip>
      );
    }
    return <Sun1 size={size} className={className} onClick={onClickFunction} />;
  }

  return (
    <Button
      className=" min-w-0 p-0 ml-auto"
      size="sm"
      variant="light"
      onClick={onClickFunction}
    >
      {icon()}
    </Button>
  );
}
function QuestionItem({
  item,
  deleteQuestion,
  index,
}: {
  item: Question;
  deleteQuestion: (id: number) => void;
  index: number;
}) {
  function deleteItem() {
    deleteQuestion(index);
  }

  function editItem() {
    console.log("Jestem w edit item");
  }

  return (
    <Card shadow="sm" className="p-2 qusetion-component">
      <CardBody className="flex flex-row">
        <div className=" self-center">
          {item.id}. {item.description}
        </div>
        <div className=" ml-auto">
          <ActionButton actionIcon="Edit" onClickFunction={editItem} />
          <ActionButton actionIcon="Trash" onClickFunction={deleteItem} />
        </div>
      </CardBody>
    </Card>
  );
}

export default QuestionItem;
