import React, { useState } from "react";
import { Input, Radio, RadioGroup } from "@nextui-org/react";

import { Question } from "../../types";

function OpenForm({ question }: { question: Question }) {
  const [answer, setAnswer] = useState<string>();

  return (
    <Input
      //   label="select answers"
      value={answer}
      onValueChange={setAnswer}
    >
      {question.options.map((element) => (
        <Radio key={element} value={element}>
          {element}
        </Radio>
      ))}
    </Input>
  );
}

export default OpenForm;
