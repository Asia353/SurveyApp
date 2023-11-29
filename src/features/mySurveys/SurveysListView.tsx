import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import { Link } from "react-router-dom";

import { useSurveyContext } from "../../SurveysContext";
import { SurveyDescriptionPage } from "../../pages";

function SurveyListView() {
  const surveysContext = useSurveyContext();

  const [description, setDescription] = useState(false);
  const [descriptionElementId, setDescriptionElementId] = useState(-1);

  return (
    <div className="flex flex-col w-full gap-2">
      {surveysContext.surveysList.map((element, index) =>
        description && descriptionElementId === index ? (
          <>
            {/* <SurveyDescriptionPage surveyId={index} /> */}
            <Link color="foregrourend" to="/description-survey">
              My Survey
            </Link>
          </>
        ) : (
          <Card
            isPressable
            onPress={() => {
              setDescription(true);
              setDescriptionElementId(index);
            }}
          >
            <CardHeader className="p-5">{element.name}</CardHeader>
          </Card>
        ),
      )}
    </div>
  );
}

export default SurveyListView;
