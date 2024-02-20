import React from "react";
import { Card, CardFooter, CardHeader } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { Survey } from "../../types";
import ActionButton from "../../components/Button/ActionButton";

function SurveyListView({
  surveysList,
  publishSurvey,
}: {
  surveysList: Survey[];
  publishSurvey: (surveyId: number) => void;
}) {
  return (
    <div className="flex flex-col w-full gap-2">
      {surveysList.map((element, index) => (
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
                  publishSurvey(element.id);
                }}
              />
            ) : (
              <div className="flex">
                <ActionButton
                  actionIcon="Diagram"
                  onClickFunction={() =>
                    navigator.clipboard.writeText(
                      `http://localhost:3000/statistics?surveyid=${element.id}`,
                    )
                  }
                />
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
