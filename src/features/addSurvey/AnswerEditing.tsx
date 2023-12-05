import React, { useState } from "react";
import { EmojiHappy } from "iconsax-react";
import { Input } from "@nextui-org/react";

import ActionButton from "../../components/Button/ActionButton";
import OneAnswer from "./OneAnswer";

function AnswerEditing({
  answer,
  id,
  deleteAnswerFromList,
  editAnswer,
}: {
  answer: string;
  id: number;
  deleteAnswerFromList: (id: number) => void;
  editAnswer: (id: number, newValue: string) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [newAnswer, setNewAnswer] = useState(answer);

  function deleteAnswer() {
    deleteAnswerFromList(id);
  }

  function saveEditedAnswer() {
    editAnswer(id, newAnswer);
    setIsEditing(false);
  }

  function dontSaveEditedAnswer() {
    setNewAnswer(answer);
    setIsEditing(false);
  }

  // function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
  //   if (e.key === "Enter") {
  //     setIsEditing(!isEditing);
  //   }
  // }

  return (
    <div
      role="button" // Dodaj role przycisku, aby określić, że jest to interaktywny element
      className="flex flex-row pb-3"
      tabIndex={0}
      onClick={() => setIsEditing(true)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          setIsEditing(true);
        }
      }}
    >
      <div className=" self-center">
        <EmojiHappy
          className="self-center"
          size="22"
          color="#A1A1AA"
          variant="Bold"
        />
      </div>

      {isEditing ? (
        <Input
          className="mr-4 ml-4"
          value={newAnswer}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setNewAnswer(e.target.value);
          }}
          onBlur={() => {
            saveEditedAnswer();
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              saveEditedAnswer();
            }
          }}
        />
      ) : (
        <p className="p-0 pl-4 m-0">{newAnswer}</p>
      )}
      <div className=" self-center ml-auto">
        <ActionButton
          actionIcon="Trash"
          onClickFunction={() => deleteAnswerFromList(id)}
        />
      </div>
    </div>
  );
}

export default AnswerEditing;
