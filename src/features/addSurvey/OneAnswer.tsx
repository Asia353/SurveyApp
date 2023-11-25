import React, { useState } from "react";
import { EmojiHappy } from "iconsax-react";
import ActionButton from "./ActionButton";

function OneAnswer({
  answer, // editAnswer,
}: {
  answer: string;
  // editAnswer: (id: number, newValue: string) => void;
}) {
  // return <p>{answer}</p>;
  // const [editElement, setEditElement] = useState(false);

  // function edit(id: number, newValue: string) {
  //   if (editElement) editAnswer(id, newValue);
  // }

  return (
    <div className="flex flex-row">
      <EmojiHappy
        className="self-center mr-5"
        size="22"
        color="#A1A1AA"
        variant="Bold"
      />
      {answer}
    </div>
  );
}

export default OneAnswer;
