/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Button, Card, CardBody, CardFooter, Tooltip } from "@nextui-org/react";
import React, { useState } from "react";

import { Question } from "../../pages/AddSurveyPage";
import ActionButton from "./ActionButton";

function QuestionItem({
  item,
  deleteQuestion,
  index,
}: {
  item: Question;
  deleteQuestion: (id: number) => void;
  index: number;
}) {
  const [showDetails, setShowDetails] = useState(false);
  function deleteItem() {
    deleteQuestion(index);
  }

  function editItem() {
    console.log("Jestem w edit item");
  }

  function details() {
    setShowDetails(!showDetails);
  }

  return (
    <Card
      shadow="sm"
      className="p-2 qusetion-component"
      // isPressable
      // onPress={() => console.log("Jestem w show details")}
    >
      <CardBody className="flex flex-row">
        <div className=" self-center">
          {item.id}. {item.description}
        </div>
        <div className=" ml-auto flex flex-row">
          {showDetails ? (
            <ActionButton actionIcon="ArrowUp2" onClickFunction={details} />
          ) : (
            <ActionButton actionIcon="ArrowDown2" onClickFunction={details} />
          )}
          <ActionButton actionIcon="Edit" onClickFunction={editItem} />
          <ActionButton actionIcon="Trash" onClickFunction={deleteItem} />
        </div>
      </CardBody>
      {showDetails && (
        <CardFooter>
          <div>
            type: {item.type} . . . options length: {item.options.length} . . .
            options: {item.options}
          </div>
        </CardFooter>
      )}
    </Card>
  );
}

export default QuestionItem;
