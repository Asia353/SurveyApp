import { Button, Card, Input } from "@nextui-org/react";
import React, { useState } from "react";
import { Add, EmojiHappy } from "iconsax-react";
import OneAnswer from "./OneAnswer";

function AnswersAdding() {
  const [answersList, setAnswersList] = useState(["Answer1", "Answer2"]);
  const [newAnswer, setNewAnswer] = useState("");

  function addAnswerToList() {
    setAnswersList([...answersList, newAnswer]);
    setNewAnswer("");
  }

  return (
    <Card className="p-4">
      <div className=" flex flex-col">
        {answersList.map((answer) => (
          <OneAnswer answer={answer} />
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
          className="ml-auto self-center ml-4 h-12"
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
