import React, { useState } from "react";
import { Radio, RadioGroup } from "@nextui-org/react";

import { Question } from "../../types";

function OneOptionForm({ question }: { question: Question }) {
  const [selectedAnswer, setSelectedAnswer] = useState<string>();

  return (
    <RadioGroup
      //   label="select answers"
      value={selectedAnswer}
      onValueChange={setSelectedAnswer}
    >
      {question.options.map((element) => (
        <Radio key={element} value={element}>
          {element}
        </Radio>
      ))}
    </RadioGroup>
  );
}

export default OneOptionForm;
