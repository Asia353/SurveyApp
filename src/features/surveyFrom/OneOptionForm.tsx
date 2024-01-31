import React, { useEffect, useState } from "react";
import { Radio, RadioGroup } from "@nextui-org/react";

import { Question } from "../../types";

function OneOptionForm({
  question,
  updateAnswers,
}: {
  question: Question;
  updateAnswers: (questionId: number, newAnswers: string[]) => void;
}) {
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");

  useEffect(() => {
    updateAnswers(question.id, [selectedAnswer]);
  }, [selectedAnswer]);

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
