import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import { Link } from "react-router-dom";

import { useSurveyContext } from "../../SurveysContext";
import { SurveyDescriptionPage } from "../../pages";
import { Survey } from "../../types";

function SurveyListView({ surveysList }: { surveysList: Survey[] }) {
  // const surveysContext = useSurveyContext();

  const [description, setDescription] = useState(false);
  const [descriptionElementId, setDescriptionElementId] = useState(-1);

  return (
    <div className="flex flex-col w-full gap-2">
      {surveysList.map((element, index) =>
        description && descriptionElementId === index ? (
          <>
            {/* <SurveyDescriptionPage surveyId={index} /> */}
            {/* <Link color="foregrourend" to="/description-survey">
              My Survey
            </Link> */}
          </>
        ) : (
          // <Link color="foregrourend" to="/description-survey">
          <Link
            color="foregrourend"
            to={`/description-survey?surveyid=${index + 1}`}
            // to="/description-survey"
          >
            <Card>
              <CardHeader className="p-5">
                {element.id}. {element.name}
              </CardHeader>
            </Card>
          </Link>
        ),
      )}
    </div>
  );
}

export default SurveyListView;
