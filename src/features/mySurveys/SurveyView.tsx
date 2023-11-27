import React, { useState } from "react";
import { Button, Card } from "@nextui-org/react";
import { Link } from "react-router-dom";

import { Survey } from "../../types";

function SurveyView({
  survey,
  id,
  setDescription,
  setDescriptionElementId,
}: {
  survey: Survey;
  id: number;
  setDescription: (isDescription: boolean) => void;
  setDescriptionElementId: (elementId: number) => void;
}) {
  // const newPage = `/description-survey-${id}`;
  return (
    <Card className="">
      <Button
        as={Link}
        // to={newPage}
        tabIndex={0}
        className=" justify-start h-auto p-7"
        variant="light"
        onClick={() => {
          setDescription(true);
          setDescriptionElementId(id);
        }}
      >
        {survey.name}
      </Button>
    </Card>
  );
}

export default SurveyView;
