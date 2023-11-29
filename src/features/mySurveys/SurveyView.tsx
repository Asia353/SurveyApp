import React, { useState } from "react";
import { Button, Card } from "@nextui-org/react";
import { Link } from "react-router-dom";

import { Survey } from "../../types";
import { SurveyDescriptionPage } from "../../pages";

function SurveyView({
  survey,
  id,
  description,
  descriptionElementId,
  setDescription,
  setDescriptionElementId,
}: {
  survey: Survey;
  id: number;
  description: boolean;
  descriptionElementId: number;
  setDescription: (isDescription: boolean) => void;
  setDescriptionElementId: (elementId: number) => void;
}) {
  // const newPage = `/description-survey-${id}`;
  return (
    // <Card>
    <>
      <div
        role="button"
        // as={Link}
        // to={newPage}
        tabIndex={0}
        className=" justify-start h-auto p-5"
        // variant="light"
        onClick={() => {
          setDescription(!description);
          setDescriptionElementId(id);
        }}
        onKeyDown={(e) => {
          setDescription(true);
          setDescriptionElementId(id);
        }}
      >
        {/* <p className="text-medium">{survey.name}</p> */}
      </div>
      {description && descriptionElementId === id && (
        <SurveyDescriptionPage surveyId={id} />
      )}
    </>
    // </Card>
  );
}

export default SurveyView;
