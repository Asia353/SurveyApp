/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Card, CardBody, CardFooter } from "@nextui-org/react";
import React, { useState } from "react";

import { Question } from "../../types";
import OneAnswer from "../addSurvey/OneAnswer";
import ActionButton from "../../components/Button/ActionButton";

function QuestionItem({ item, index }: { item: Question; index: number }) {
  const [showDetails, setShowDetails] = useState(false);

  const [newDescription] = useState(item.description);
  const [newType] = useState(item.type);
  const [newOptions] = useState(item.options);

  function toggleDetails() {
    setShowDetails(!showDetails);
  }

  return (
    // <Card shadow="sm" className="p-2">
    <Card shadow="sm" className="p-2" isPressable onPress={toggleDetails}>
      <CardBody className="flex flex-row">
        <div className=" self-center">
          {index + 1}. {newDescription}
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
        </div>
      </CardBody>

      {showDetails && (
        <CardFooter className="flex flex-col items-start">
          <p className="mb-3">Question type: {newType}</p>
          <div className="flex flex-col">
            {newOptions.map((answer) => (
              <OneAnswer key={answer} answer={answer} />
            ))}
          </div>
        </CardFooter>
      )}
    </Card>
  );
}

export default QuestionItem;
