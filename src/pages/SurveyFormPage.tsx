import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
} from "@nextui-org/react";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import QuestionForm from "../features/surveyFrom/QuestionForm";

import "./Page.css";
import { useSurveyContext } from "../SurveysContext";

function Page() {
  const context = useSurveyContext();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const surveyIndex = Number(searchParams.get("surveyid")) - 1;
  const [isEdit, setIsEdit] = useState(false);

  const changeEdit = () => {
    setIsEdit(!isEdit);
  };

  const [surveyQuestions, setSurveyQuestions] = useState(
    context.surveysList.find((element) => element.id === surveyIndex + 1)
      ?.questions,
  );

  const getNewId = () => {
    return surveyIndex + 1;
  };

  const [surveyName, setSurveyName] = useState(
    context.surveysList.find((element) => element.id === surveyIndex + 1)?.name,
  );

  return (
    <div>
      {surveyName && surveyQuestions ? (
        <div className="flex flex-col items-center p-8 form-component">
          <Card className="survey-component">
            <CardHeader className="p-7 flex flex-row justify-between">
              {context.surveysList[surveyIndex]?.name}
            </CardHeader>
            {/* <Divider /> */}
            <CardBody className="m-0 p-0">
              <>
                {context.surveysList[surveyIndex].questions.map(
                  (element, index) => (
                    <>
                      <Divider />
                      <QuestionForm question={element} />
                    </>
                  ),
                )}
              </>
            </CardBody>
            {/* <Divider /> */}
            <CardFooter className="p-0 pt-7 m-0">
              <Button className=" w-full" size="lg" radius="none">
                Send answers
              </Button>
            </CardFooter>
          </Card>
        </div>
      ) : (
        <p>Page not found</p>
      )}
    </div>
  );
}

export default Page;
