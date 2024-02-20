import React, { useEffect, useState } from "react";
import { Radio, RadioGroup } from "@nextui-org/react";

function OneOptionForm({
  questionId,
  options,
  updateAnswers,
}: {
  questionId: number;
  options: string[];
  updateAnswers: (questionId: number, newAnswers: string[]) => void;
}) {
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");

  useEffect(() => {
    updateAnswers(questionId, [selectedAnswer]);
  }, [selectedAnswer]);

  return (
    <RadioGroup
      //   label="select answers"
      value={selectedAnswer}
      onValueChange={setSelectedAnswer}
    >
      {options.map((element) => (
        <Radio key={element} value={element}>
          {element}
        </Radio>
      ))}
    </RadioGroup>
  );
}

export default OneOptionForm;
