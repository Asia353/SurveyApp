import { Button, Card, Input, Select, SelectItem } from "@nextui-org/react";
import React, { useState } from "react";
import { Question, QuestionType } from "../../types";
import { AnswersAdding } from "..";

export const questionTypeList = ["one option", "many options", "open"];
// export type QuestionTypee = (typeof questionTypeList)[1];

type QuestionFormProp = {
  question: Question;
  addQuestion: (question: Question) => void;
};

function QuestionForm({ questionProp }: { questionProp: QuestionFormProp }) {
  const [description, setDescription] = useState(
    questionProp.question.description,
  );
  const [type, setType] = useState(questionProp.question.type);
  const [options, setOptions] = useState(questionProp.question.options);

  function onAdd(newAnswer: string) {
    setOptions([...options, newAnswer]);
  }

  function onDelete(id: number) {
    setOptions((prevList) => prevList.filter((_, index) => index !== id));
  }

  function onEdit(id: number, newValue: string) {
    setOptions((prevOptions) =>
      prevOptions.map((option, index) => (index === id ? newValue : option)),
    );
  }

  function addNewQuestion() {
    questionProp.addQuestion({
      description,
      type,
      id: questionProp.question.id,
      options,
    });
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
          {questionTypeList.map((element) => (
            <SelectItem key={element} value={element}>
              {element}
            </SelectItem>
          ))}
        </Select>
        {type !== QuestionType.Open && (
          <AnswersAdding
            answerProp={{
              answersList: options,
              onDelete,
              onAdd,
              onEdit,
            }}
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
