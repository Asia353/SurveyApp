/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Button, Card, CardBody } from "@nextui-org/react";
import React from "react";
import { Trash } from "iconsax-react";

import { Question } from "../../pages/AddSurveyPage";

function QuestionItem({
  item,
  deleteQuestion,
  index,
}: {
  item: Question;
  deleteQuestion: (id: number) => void;
  index: number;
}) {
  function deleteItem() {
    deleteQuestion(index);
  }

  return (
    <Card shadow="sm" className="p-2 qusetion-component">
      <CardBody className="flex flex-row">
        <div>
          {item.id}, index: {index}, {item.description}
        </div>
        <Button className=" ml-auto" variant="light" onClick={deleteItem}>
          <Trash size="15" />
        </Button>
      </CardBody>
    </Card>
  );
}

export default QuestionItem;
