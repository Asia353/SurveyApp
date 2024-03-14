import { Button, Card, Input } from "@nextui-org/react";
import React, { useState } from "react";
import { Add, EmojiHappy } from "iconsax-react";
import AnswerEditing from "./AnswerEditing";

export type AnswersAddingProp = {
  answersList: string[];
  onDelete: (id: number) => void;
  onAdd: (newAnswer: string) => void;
  onEdit: (id: number, newAnswer: string) => void;
};
function AnswersAdding({ answerProp }: { answerProp: AnswersAddingProp }) {
  const [newAnswer, setNewAnswer] = useState("");

  function addAnswer() {
    answerProp.onAdd(newAnswer);
    setNewAnswer("");
  }

  return (
    // <Card className="p-4">
    <div>
      <div className=" flex flex-col">
        {answerProp.answersList.map((answer, index) => (
          <AnswerEditing
            key={`${answer}`}
            answerProp={{
              answer,
              id: index,
              onDelete: answerProp.onDelete,
              onEdit: answerProp.onEdit,
            }}
          />
        ))}
      </div>
      <div className=" flex flex-row">
        <div className="self-center">
          <EmojiHappy
            className="self-center mr-4"
            size="22"
            color="#71717A"
            variant="Bold"
          />
        </div>
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
          onKeyDown={(e) => {
            if (e.key === "Enter") addAnswer();
          }}
        />
        <Button
          className="self-center h-auto w-auto p-0 min-w-0 ml-4"
          size="sm"
          variant="light"
          onClick={addAnswer}
        >
          <Add size="28" color="#71717A" variant="Linear" />
        </Button>
      </div>
    </div>
    // </Card>
  );
}

export default AnswersAdding;
