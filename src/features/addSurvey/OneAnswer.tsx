import React from "react";
import { EmojiHappy } from "iconsax-react";
import { ActionButton } from "./QuestionItem";

function OneAnswer({
  answer,
  id,
  deleteAnswerFromList,
}: {
  answer: string;
  id: number;
  deleteAnswerFromList: (id: number) => void;
}) {
  function deleteAnswer() {
    deleteAnswerFromList(id);
  }
  // return <p>{answer}</p>;
  return (
    <div className="flex flex-row pb-3">
      <EmojiHappy
        className="self-center mr-5"
        size="22"
        color="#A1A1AA"
        variant="Bold"
      />
      <p>{answer}</p>
      <ActionButton actionIcon="Trash" onClickFunction={deleteAnswer} />
    </div>
  );
}

export default OneAnswer;
