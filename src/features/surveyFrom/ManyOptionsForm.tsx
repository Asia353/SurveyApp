import React, { useEffect, useState } from "react";
import { Checkbox, CheckboxGroup } from "@nextui-org/react";

import { Question } from "../../types";

function ManyOptionsForm({
  question,
  updateAnswers,
}: {
  question: Question;
  updateAnswers: (questionId: number, newAnswers: string[]) => void;
}) {
  const [selectedAnswersList, setSelectedAnswersList] = useState<string[]>([]);

  useEffect(() => {
    updateAnswers(question.id, selectedAnswersList);
  }, [selectedAnswersList]);

  return (
    <CheckboxGroup
      //   label="select answers"
      value={selectedAnswersList}
      onValueChange={setSelectedAnswersList}
    >
      {question.options.map((element) => (
        <Checkbox key={element} value={element}>
          {element}
        </Checkbox>
      ))}
    </CheckboxGroup>
  );
}

export default ManyOptionsForm;
