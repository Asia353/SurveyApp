import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import "./Page.css";
import { useSurveyContext } from "../SurveysContext";
import { Question, RepliesList, Reply, Survey } from "../types";
import QuestionItem from "../features/mySurveys/QuestionItem";
import * as FirebaseFunctions from "../FirebaseFunctions";

function Page() {
  const context = useSurveyContext();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const surveyId = Number(searchParams.get("surveyid"));

  const [currentSurvey, setCurrentSurvey] = useState<Survey>();

  useEffect(() => {
    const survey = context.surveysList.find(
      (element) => element.id === surveyId,
    );
    setCurrentSurvey(survey);
  }, [context.surveysList, surveyId]);

  const [replies, setReplies] = useState<RepliesList[]>();

  useEffect(() => {
    const asyncFunctin = async () => {
      setReplies(await FirebaseFunctions.loadResultsFromFirestore(surveyId));
    };
    asyncFunctin();
  }, []);

  return (
    <div className="flex flex-col items-center p-8 form-component">
      <Card className="survey-component p-7">
        <CardHeader className="mb-7 p-0"> My surveys</CardHeader>
        <div className=" flex flex-col gap-2">
          {currentSurvey?.questions.map((question, index) => (
            <QuestionItem
              key={question.description}
              item={question}
              index={index}
            />
          ))}
        </div>
        <CardFooter className="p-0 pt-7 m-0">
          <Button
            className=" w-full"
            size="lg"
            radius="none"
            onClick={() => console.log(replies)}
          >
            print results TEST
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Page;
