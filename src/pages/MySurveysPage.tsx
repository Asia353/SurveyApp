import React from "react";
import { Button, Card, CardHeader } from "@nextui-org/react";
import { Link } from "react-router-dom";

import "./Page.css";
import SurveyListView from "../features/mySurveys/SurveysListView";
import { useSurveyContext } from "../contexts/SurveysContext";

function Page() {
  const context = useSurveyContext();
  // console.log("MySurveysPage");
  // console.log(context.surveysList);
  // console.log();
  // console.log();
  // const cardClassValue = "flex flex-col items-center justify-center p-8";
  return (
    <div className="flex flex-col items-center justify-center p-4 sm:px-4 md:px-20 lg:px-48">
      <Card className="p-7 w-full" style={{ minWidth: 300, maxWidth: 600 }}>
        <CardHeader className="mb-7 p-0">
          <p>My Surveys</p>
        </CardHeader>
        <div className="m-0 p-0">
          <SurveyListView
            key={`${"keySurveyListViewss"}`}
            surveysList={context.surveysList}
            publishSurvey={context.publishSurvey}
          />
        </div>
        <Button className="mt-10" as={Link} to="/add-survey">
          ADD NEW SURVEY
        </Button>
      </Card>
    </div>
  );
}

export default Page;
