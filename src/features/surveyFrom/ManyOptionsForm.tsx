import React, { useState } from "react";
import { Checkbox, CheckboxGroup } from "@nextui-org/react";

import { Question } from "../../types";

function ManyOptionsForm({ question }: { question: Question }) {
  const [selectedAnswersList, setSelectedAnserwsList] = useState<string[]>([]);

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
