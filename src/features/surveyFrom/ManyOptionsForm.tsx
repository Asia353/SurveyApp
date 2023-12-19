import React, { useEffect, useState } from "react";
import { Checkbox, CheckboxGroup } from "@nextui-org/react";

import { Question } from "../../types";

function ManyOptionsForm({
  question,
  updateAnserws,
}: {
  question: Question;
  updateAnserws: (questionId: number, newAnswers: string[]) => void;
}) {
  const [selectedAnswersList, setSelectedAnserwsList] = useState<string[]>([]);

  useEffect(() => {
    updateAnserws(question.id, selectedAnswersList);
  }, [selectedAnswersList]);

  return (
    <CheckboxGroup
      //   label="select answers"
      value={selectedAnswersList}
      onValueChange={setSelectedAnserwsList}
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
