import React, { useEffect, useState } from "react";
import { Input, Radio } from "@nextui-org/react";

function OpenForm({
  questionId,
  options,
  updateAnswers,
}: {
  questionId: number;
  options: string[];
  updateAnswers: (questionId: number, newAnswers: string[]) => void;
}) {
  const [answer, setAnswer] = useState<string>("");

  useEffect(() => {
    updateAnswers(questionId, [answer]);
  }, [answer]);

  return (
    <Input
      //   label="select answers"
      value={answer}
      onValueChange={setAnswer}
    >
      {options.map((element) => (
        <Radio key={element} value={element}>
          {element}
        </Radio>
      ))}
    </Input>
  );
}

export default OpenForm;
