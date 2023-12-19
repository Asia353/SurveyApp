import React, { useEffect, useState } from "react";
import { Radio, RadioGroup } from "@nextui-org/react";

import { Question } from "../../types";

function OneOptionForm({
  question,
  updateAnserws,
}: {
  question: Question;
  updateAnserws: (questionId: number, newAnswers: string[]) => void;
}) {
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");

  useEffect(() => {
    updateAnserws(question.id, [selectedAnswer]);
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
