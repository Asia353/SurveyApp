import { Button, Card, Input } from "@nextui-org/react";
import React, { useState } from "react";
import { Add, EmojiHappy } from "iconsax-react";

function OneAnswer({ answer }: { answer: string }) {
  // return <p>{answer}</p>;
  return (
    <div className="flex flex-row pb-3">
      <EmojiHappy
        className="self-center mr-4"
        size="22"
        color="gray"
        variant="Bold"
      />
      <p>{answer}</p>
    </div>
  );
}

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
      <div className=" flex flex-row">
        <EmojiHappy
          className="self-center mr-4"
          size="28"
          color="gray"
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
          <Add size="28" color="gray" variant="Linear" />
        </Button>
      </div>
    </Card>
  );
}

export default AnswersAdding;
