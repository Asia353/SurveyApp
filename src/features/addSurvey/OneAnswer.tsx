import React from "react";
import { EmojiHappy } from "iconsax-react";

function OneAnswer({ answer }: { answer: string }) {
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
    </div>
  );
}

export default OneAnswer;
