/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Card, CardBody, CardFooter } from "@nextui-org/react";
import React, { useState } from "react";

import { Question } from "../../types";
import OneAnswer from "../addSurvey/OneAnswer";
import ActionButton from "../../components/Button/ActionButton";

function QuestionItem({ item, index }: { item: Question; index: number }) {
  const [showDetails, setShowDetails] = useState(false);

  const [newDescription, setNewDescription] = useState(item.description);
  const [newType, setNewType] = useState(item.type);
  const [newOptions, setNewOptions] = useState(item.options);

  function details() {
    setShowDetails(!showDetails);
  }

  return (
    <Card shadow="sm" className="p-2">
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
    </Card>
  );
}

export default QuestionItem;
