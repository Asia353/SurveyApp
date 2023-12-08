import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
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
  surveyPublish: (surveyIndex: number) => void;
}) {
  const publishS = (index: number) => {
    surveyPublish(index);
  };

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
            to={`/description-survey?surveyid=${index + 1}`}
            className="flex flex-row w-full"
          >
            <CardHeader className="p-0 w-auto">
              {element.id}. {element.name}
            </CardHeader>
          </Link>
          <CardFooter className="p-0 justify-end">
            {!element.published ? (
              <ActionButton
                actionIcon="Send"
                onClickFunction={() => {
                  surveyPublish(index);
                }}
              />
            ) : (
              <Link
                color="foregrourend"
                to={`/survey-form?surveyid=${index + 1}`}
              >
                <Link2 size="16" />
              </Link>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

export default SurveyListView;
