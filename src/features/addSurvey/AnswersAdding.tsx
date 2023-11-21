import { Button, Card, Input } from "@nextui-org/react";
import React, { useState } from "react";
import { Add, EmojiHappy } from "iconsax-react";
import OneAnswer from "./OneAnswer";

function AnswersAdding() {
  const [answersList, setAnswersList] = useState<string[]>([]);
  const [newAnswer, setNewAnswer] = useState("");

  function addAnswerToList() {
    setAnswersList([...answersList, newAnswer]);
    setNewAnswer("");
  }

  function deleteAnswerFromList(id: number) {
    setAnswersList((prevList) =>
      prevList.filter((element, index) => index !== id),
    );
  }

  return (
    <Card className="p-4">
      <div className=" flex flex-col">
        {answersList.map((answer, index) => (
          <OneAnswer
            answer={answer}
            id={index}
            deleteAnswerFromList={deleteAnswerFromList}
          />
        ))}
      </div>
      <div className=" flex flex-row mt-2">
        <EmojiHappy
          className="self-center mr-4"
          size="28"
          color="#71717A"
          variant="Bold"
        />
        <Input
          // className=""
          variant="bordered"
          size="sm"
          type="text"
          label="Definiton"
          value={newAnswer}
          onChange={(e) => {
            setNewAnswer(e.target.value);
          }}
        />
        <Button
          className="self-center h-auto w-auto p-0 min-w-0 ml-4"
          size="sm"
          variant="light"
          onClick={addAnswerToList}
        >
          <Add size="28" color="#71717A" variant="Linear" />
        </Button>
      </div>
    </Card>
  );
}

export default AnswersAdding;
