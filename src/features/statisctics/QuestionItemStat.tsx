import React, { useState } from "react";
import { Card, CardBody, CardFooter } from "@nextui-org/react";
import Answer from "../addSurvey/Answer";

import { Question, QuestionType, RepliesList } from "../../types";
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

  function toggleDetails() {
    setShowDetails((show) => !show);
  }

  const numberOfAnswers = () => {
    if (item.type !== QuestionType.Open) {
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
    <Card shadow="sm" className="p-2" isPressable onPress={toggleDetails}>
      <CardBody className="flex flex-row">
        <div className=" self-center">
          {index + 1}. {item.description}
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
          <p className="">Question type: {item.type}</p>
          <p className="mb-3">Number of answers: {numberOfAnswers()}</p>
          {/* <div>{item.type === "open" && <p>dsfadfs</p>}</div> */}
          <div className="flex flex-col w-full">
            {item.type !== QuestionType.Open &&
              item.options.map((answer, idx) => (
                <div className="flex flex-row justify-between" key={answer}>
                  <Answer answer={answer} />
                  {numberOfAnswers() > 0 ? (
                    <p className="">
                      {Math.round(
                        ((repliesCounter[idx] * 100) / numberOfAnswers()) * 100,
                      ) / 100}
                      %
                    </p>
                  ) : (
                    <p className="">0%</p>
                  )}
                </div>
              ))}
            {item.type === QuestionType.Open &&
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
