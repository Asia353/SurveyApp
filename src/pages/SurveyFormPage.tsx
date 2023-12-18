import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import QuestionForm from "../features/surveyFrom/QuestionForm";

import "./Page.css";
import { useSurveyContext } from "../SurveysContext";
import { loadSurveyByIdFromFirestore } from "../FirebaseFunctions";
import { Question, Survey } from "../types";

function Page() {
  const context = useSurveyContext();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const surveyId = Number(searchParams.get("surveyid"));

  // const [currentSurvey, setCurrentSurvey] = useState<Survey>();

  // useEffect(() => {
  //   const asyncFunction = async () => {
  //     setCurrentSurvey(await loadSurveyByIdFromFirestore(surveyId));
  //   };
  //   asyncFunction();
  //   console.log("Id: ", surveyId);
  //   console.log(currentSurvey);
  // }, []);

  const [isEdit, setIsEdit] = useState(false);

  // const changeEdit = () => {
  //   setIsEdit(!isEdit);
  // };

  const currentSurvey = context.surveysList.find(
    (element) => element.id === surveyId,
  );

  // const [surveyQuestions, setSurveyQuestions] = useState<Question[]>([]);
  // const [surveyName, setSurveyName] = useState<string>("");

  // if (currentSurvey) {
  //   setSurveyQuestions(currentSurvey.questions);
  //   setSurveyName(currentSurvey.name);
  // }

  // const getNewId = () => {
  //   return surveyIndex + 1;
  // };

  // const [surveyName, setSurveyName] = useState(currentSurvey?.name);

  return (
    <div>
      {currentSurvey ? (
        <div className="flex flex-col items-center p-8 form-component">
          <Card className="survey-component">
            <CardHeader className="p-7 flex flex-row justify-between">
              {currentSurvey?.name}
            </CardHeader>
            {/* <Divider /> */}
            <CardBody className="m-0 p-0">
              {/* <> */}
              {currentSurvey?.questions.map((element, index) => (
                <>
                  <Divider />
                  <QuestionForm question={element} />
                </>
              ))}
              {/* </> */}
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
