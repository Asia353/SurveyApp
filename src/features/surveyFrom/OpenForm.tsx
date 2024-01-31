import React, { useEffect, useState } from "react";
import { Input, Radio } from "@nextui-org/react";

import { Question } from "../../types";

function OpenForm({
  question,
  updateAnswers,
}: {
  question: Question;
  updateAnswers: (questionId: number, newAnswers: string[]) => void;
}) {
  const [answer, setAnswer] = useState<string>("");

  useEffect(() => {
    updateAnswers(question.id, [answer]);
  }, [answer]);

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
