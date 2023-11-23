import { Button, Card, Input, Select, SelectItem } from "@nextui-org/react";
import React, { useState } from "react";
import { Question } from "../../pages/AddSurveyPage";
import { AnswearsAdding } from "..";

function QuestionForm({
  addQuestion,
  question,
}: {
  addQuestion: (
    description: string,
    type: string,
    id: number,
    options: string[],
  ) => void;
  question: Question;
}) {
  const [description, setDescription] = useState(question.description);
  const [type, setType] = useState(question.type);
  const [options, setOptions] = useState(question.options);

  function addAnswerToList(newAnswer: string) {
    setOptions([...options, newAnswer]);
  }

  function deleteAnswerFromList(id: number) {
    setOptions((prevList) => prevList.filter((element, index) => index !== id));
  }

  const typesList = ["one option", "many options", "open"];

  function addNewQuestion() {
    addQuestion(description, type, question.id, options);
    setDescription("");
    setType("");
    setOptions([]);
  }

  return (
    <Card className="p-4 mt-4">
      <div className="flex flex-col gap-2 mt-4 mb-4">
        <Input
          type="text"
          label="Question description"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <Select
          label="Select question's type"
          selectedKeys={[type]}
          onChange={(e) => {
            setType(e.target.value);
          }}
        >
          {typesList.map((element) => (
            <SelectItem key={element} value={element}>
              {element}
            </SelectItem>
          ))}
        </Select>
        {(type === "one option" || type === "many options") && (
          <AnswearsAdding
            answersList={options}
            deleteAnswerFromList={deleteAnswerFromList}
            addAnswerToList={addAnswerToList}
          />
        )}
        <Button className="button self-end mt-2" onPress={addNewQuestion}>
          SAVE
        </Button>
      </div>
    </Card>
  );
}

export default QuestionForm;
