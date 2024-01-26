import { Button, Card, Input, Select, SelectItem } from "@nextui-org/react";
import React, { useState } from "react";
import { Question, QuestionType } from "../../types";
import { AnswearsAdding } from "..";

export const typesList = ["one option", "many options", "open"];

function QuestionForm({
  addQuestion,
  question,
}: {
  addQuestion: (
    description: string,
    type: QuestionType,
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
    setOptions((prevList) => prevList.filter((_, index) => index !== id));
  }

  function editAnswer(id: number, newValue: string) {
    setOptions((prevOptions) =>
      prevOptions.map((option, index) => (index === id ? newValue : option)),
    );
  }

  // const typesList = ["one option", "many options", "open"];

  function addNewQuestion() {
    addQuestion(description, type, question.id, options);
    setDescription("");
    setType(QuestionType.OneOption);
    setOptions([]);
  }

  const setQuestionType = (newType: String) => {
    if (newType === "one option") {
      setType(QuestionType.OneOption);
    } else if (newType === "many options") {
      setType(QuestionType.ManyOptions);
    } else setType(QuestionType.Open);
  };

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
            setQuestionType(e.target.value);
          }}
        >
          {typesList.map((element) => (
            <SelectItem key={element} value={element}>
              {element}
            </SelectItem>
          ))}
        </Select>
        {(type === QuestionType.OneOption || QuestionType.ManyOptions) && (
          <AnswearsAdding
            answersList={options}
            deleteAnswerFromList={deleteAnswerFromList}
            addAnswerToList={addAnswerToList}
            editAnswer={editAnswer}
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
