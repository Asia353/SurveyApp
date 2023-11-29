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
      {/* <OneAnswer answer={answer} /> */}
      {isEditing ? (
        <Input
          className="mr-4"
          value={newAnswer}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setNewAnswer(e.target.value);
          }}
          // onBlur={() => saveEditedAnswer()}
          onBlur={() => {
            saveEditedAnswer();
          }}
          // autoFocus
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              saveEditedAnswer();
            }
          }}
        />
      ) : (
        <OneAnswer answer={newAnswer} />
      )}
      <div className=" ml-auto">
        <ActionButton
          actionIcon="Trash"
          onClickFunction={() => deleteAnswerFromList(id)}
        />
      </div>
    </div>
  );
}

export default AnswerEditing;
