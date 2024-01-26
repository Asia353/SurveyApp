import React, { useState } from "react";
import { Card, CardBody, CardFooter } from "@nextui-org/react";
import OneAnswer from "../addSurvey/OneAnswer";

import { Question, RepliesList } from "../../types";
import ActionButton from "../../components/Button/ActionButton";

function QuestionItemStat({
  item,
  index,
  replies,
  repliesCounter,
}: {
  item: Question;
  index: number;
  replies: RepliesList[];
  repliesCounter: number[];
}) {
  const [showDetails, setShowDetails] = useState(false);

  function details() {
    setShowDetails(!showDetails);
  }

  const numberOfAnswers = () => {
    if (item.type !== "open") {
      let sum = 0;
      repliesCounter.forEach((value) => {
        sum += value;
      });
      return sum;
    }
    return replies.length;
  };

  return (
    // <Card shadow="sm" className="p-2">
    <Card shadow="sm" className="p-2" isPressable onPress={details}>
      <CardBody className="flex flex-row">
        <div className=" self-center">
          {index + 1}. {item.description}
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
          <p className="">Question type: {item.type}</p>
          <p className="mb-3">Number of answers: {numberOfAnswers()}</p>
          {/* <div>{item.type === "open" && <p>dsfadfs</p>}</div> */}
          <div className="flex flex-col w-full">
            {item.type !== "open" &&
              item.options.map((answer, idx) => (
                <div className="flex flex-row justify-between">
                  <OneAnswer key={answer} answer={answer} />
                  <p className="">
                    {Math.round(
                      ((repliesCounter[idx] * 100) / numberOfAnswers()) * 100,
                    ) / 100}
                    %
                  </p>
                </div>
              ))}
            {item.type === "open" &&
              replies.map((repliy) => (
                <p className="p-0 m-0 mr-auto">
                  - {repliy.replies[index].answers}
                </p>
              ))}
          </div>
        </CardFooter>
      )}
    </Card>
  );
}

export default QuestionItemStat;
