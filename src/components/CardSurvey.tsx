import { Button, CardBody, CardHeader } from "@nextui-org/react";
import { Card } from "iconsax-react";
import { Link } from "react-router-dom";

import React, { ReactNode } from "react";

function CardSurvey({
  text,
  ButtonComponent,
}: {
  text: string;
  ButtonComponent: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <Card className="survey-component p-7">
        <CardHeader className="mb-7 p-0">{text}</CardHeader>
        <CardBody className="m-0 p-0">{ButtonComponent}</CardBody>
        <Button className="mt-10" as={Link} to="/add-survey">
          ADD NEW SURVEY
        </Button>
      </Card>
    </div>
  );
}
