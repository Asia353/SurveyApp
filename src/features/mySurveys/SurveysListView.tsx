import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Tooltip,
} from "@nextui-org/react";
import { Link } from "react-router-dom";
import { Link2 } from "iconsax-react";

import { useSurveyContext } from "../../SurveysContext";
import { SurveyDescriptionPage } from "../../pages";
import { Survey } from "../../types";
import ActionButton from "../../components/Button/ActionButton";

function SurveyListView({
  surveysList,
  surveyPublish,
}: {
  surveysList: Survey[];
  surveyPublish: (surveyId: number) => void;
}) {
  // const publishS = (index: number) => {
  //   surveyPublish(index);
  // };

  const [show, setShow] = useState(false);

  return (
    <div className="flex flex-col w-full gap-2">
      {surveysList.map((element, index) => (
        // element.published ? (
        //   <>
        //     {/* <SurveyDescriptionPage surveyId={index} /> */}
        //     {/* <Link color="foregrourend" to="/description-survey">
        //       My Survey
        //     </Link> */}
        //   </>
        // ) : (
        <Card
          className="flex flex-row p-5"
          key={`${element.name} ${element.id}`}
        >
          <Link
            color="foregrourend"
            to={`/description-survey?surveyid=${element.id}`}
            className="flex flex-row w-full"
          >
            <CardHeader className="p-0 w-auto">
              {index + 1}. {element.name}
            </CardHeader>
          </Link>
          <CardFooter className="p-0 justify-end">
            {!element.published ? (
              <ActionButton
                actionIcon="Send"
                onClickFunction={() => {
                  surveyPublish(element.id);
                }}
              />
            ) : (
              <div className="flex">
                <ActionButton actionIcon="Diagram" onClickFunction={() => {}} />
                {/* nie działa dobrze przez całkowite odśwezanie. Będzie git z bazą pewnie */}
                <ActionButton
                  actionIcon="Link2"
                  onClickFunction={() =>
                    navigator.clipboard.writeText(
                      `http://localhost:3000/survey-form?surveyid=${element.id}`,
                    )
                  }
                />
                {/* <Link
                  color="foregrourend"
                  to={`/survey-form?surveyid=${index + 1}`}
                >
                  <Tooltip content="Copy link" offset={10}>
                    <Link2 className="m-1" size="16" />
                  </Tooltip>
                </Link> */}
              </div>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

export default SurveyListView;
