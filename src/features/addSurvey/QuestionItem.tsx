import { Card, CardBody } from "@nextui-org/react";
import React from "react";
import { Question } from "../../pages/AddSurveyPage";

function QuestionItem({ item }: { item: Question }) {
  return (
    <Card shadow="sm" className="p-2 qusetion-component">
      <CardBody>
        <div>
          {item.description} type: {item.type} id: {item.id} options:{" "}
          {item.options}
        </div>
      </CardBody>
    </Card>
  );
}

export default QuestionItem;
