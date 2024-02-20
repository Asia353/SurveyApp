/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Card, CardBody, CardFooter } from "@nextui-org/react";
import React, { useState } from "react";

import { Question } from "../../types";
import Answer from "../addSurvey/Answer";
import ActionButton from "../../components/Button/ActionButton";

function QuestionItem({ item, index }: { item: Question; index: number }) {
  const [showDetails, setShowDetails] = useState(false);

  const [newDescription] = useState(item.description);
  const [newType] = useState(item.type);
  const [newOptions] = useState(item.options);

  function toggleDetails() {
    setShowDetails((show) => !show);
  }

  return (
    <Card shadow="sm" className="p-2" isPressable onPress={toggleDetails}>
      <CardBody className="flex flex-row">
        <div className=" self-center">
          {index + 1}. {newDescription}
        </div>
        <div className=" ml-auto flex flex-row">
          <ActionButton
            actionIcon={showDetails ? "ArrowUp2" : "ArrowDown2"}
            onClickFunction={toggleDetails}
          />
        </div>
      </CardBody>

      {showDetails && (
        <CardFooter className="flex flex-col items-start">
          <p className="mb-3">Question type: {newType}</p>
          <div className="flex flex-col">
            {newOptions.map((answer) => (
              <Answer key={answer} answer={answer} />
            ))}
          </div>
        </CardFooter>
      )}
    </Card>
  );
}

export default QuestionItem;
