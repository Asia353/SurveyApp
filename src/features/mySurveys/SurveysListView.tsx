import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import { Link } from "react-router-dom";

import { useSurveyContext } from "../../SurveysContext";
import { SurveyDescriptionPage } from "../../pages";
import { Survey } from "../../types";
import ActionButton from "../../components/Button/ActionButton";

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
            key={`${element.name} ${element.id}`}
            color="foregrourend"
            to={`/description-survey?surveyid=${index + 1}`}
            // to="/description-survey"
          >
            <Card className="flex flex-row">
              <CardHeader className="p-5">
                {element.id}. {element.name}
              </CardHeader>
              {/* <div className=" ml-auto">
                <ActionButton
                  actionIcon="Send"
                  onClickFunction={() => console.log("save")}
                />
              </div> */}
            </Card>
          </Link>
        ),
      )}
    </div>
  );
}

export default SurveyListView;
