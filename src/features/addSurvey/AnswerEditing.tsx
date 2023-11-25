import React, { useState } from "react";
import { EmojiHappy } from "iconsax-react";
import { Input } from "@nextui-org/react";

import ActionButton from "./ActionButton";
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
  const [editedAnswer, setEditedAnswer] = useState(answer);

  function deleteAnswer() {
    deleteAnswerFromList(id);
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedAnswer(e.target.value);
  };

  function handleEditButtonClick() {
    if (isEditing) {
      editAnswer(id, editedAnswer);
    } else setIsEditing(!editAnswer);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      setIsEditing(!isEditing);
    }
  }

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
          value={editedAnswer}
          onChange={handleInputChange}
          onBlur={handleEditButtonClick}
          autoFocus
          onKeyDown={handleKeyDown}
        />
      ) : (
        <OneAnswer answer={editedAnswer} />
      )}
      <div className=" ml-auto">
        <ActionButton actionIcon="Trash" onClickFunction={deleteAnswer} />
      </div>
    </div>
  );
}

export default AnswerEditing;
