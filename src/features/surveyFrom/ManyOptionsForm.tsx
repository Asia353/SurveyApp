import React, { useEffect, useState } from "react";
import { Checkbox, CheckboxGroup } from "@nextui-org/react";

function ManyOptionsForm({
  questionId,
  options,
  updateAnswers,
}: {
  questionId: number;
  options: string[];
  updateAnswers: (questionId: number, newAnswers: string[]) => void;
}) {
  const [selectedAnswersList, setSelectedAnswersList] = useState<string[]>([]);

  useEffect(() => {
    updateAnswers(questionId, selectedAnswersList);
  }, [selectedAnswersList]);

  return (
    <CheckboxGroup
      //   label="select answers"
      value={selectedAnswersList}
      onValueChange={setSelectedAnswersList}
    >
      {options.map((element) => (
        <Checkbox key={element} value={element}>
          {element}
        </Checkbox>
      ))}
    </CheckboxGroup>
  );
}

export default ManyOptionsForm;
