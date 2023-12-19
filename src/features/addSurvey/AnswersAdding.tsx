import { Button, Card, Input } from "@nextui-org/react";
import React, { useState } from "react";
import { Add, EmojiHappy } from "iconsax-react";
import AnswerEditing from "./AnswerEditing";

function AnswersAdding({
  answersList,
  deleteAnswerFromList,
  addAnswerToList,
  editAnswer,
}: {
  answersList: string[];
  deleteAnswerFromList: (id: number) => void;
  addAnswerToList: (newAnswer: string) => void;
  editAnswer: (id: number, newAnswer: string) => void;
}) {
  const [newAnswer, setNewAnswer] = useState("");

  function addAnswer() {
    addAnswerToList(newAnswer);
    setNewAnswer("");
  }

  // function editAnswer(id: number, newValue: string) {
  //   // answersList[id] = newValue;
  // }

  return (
    <Card className="p-4">
      <div className=" flex flex-col">
        {answersList.map((answer, index) => (
          <AnswerEditing
            key={`${answer}`}
            answer={answer}
            id={index}
            deleteAnswerFromList={deleteAnswerFromList}
            editAnswer={editAnswer}
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
    </Card>
  );
}

export default AnswersAdding;
