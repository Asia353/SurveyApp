import React, { useState } from "react";
import { EmojiHappy } from "iconsax-react";

function OneAnswer({ answer }: { answer: string }) {
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
