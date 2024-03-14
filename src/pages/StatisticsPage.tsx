import { Card, CardFooter, CardHeader } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import "./Page.css";
import { RepliesList, Survey } from "../types";
import * as FirebaseFunctions from "../FirebaseFunctions";
import QuestionItemStat from "../features/statisctics/QuestionItemStat";
import { useSurveyContext } from "../contexts/SurveysContext";

function Page() {
  const context = useSurveyContext();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const surveyId = String(searchParams.get("surveyid"));

  const [currentSurvey, setCurrentSurvey] = useState<Survey>();
  const [repliesCounter, setRepliesCounter] = useState<number[][]>();

  useEffect(() => {
    const survey = context.surveysList.find(
      (element) => element.id === surveyId,
    );
    setCurrentSurvey(survey);
  }, [context.surveysList, surveyId]);

  const [replies, setReplies] = useState<RepliesList[]>();

  useEffect(() => {
    const asyncFunctin = async () => {
      setReplies(await FirebaseFunctions.loadReplies(surveyId));
    };
    asyncFunctin();
  }, [surveyId]);

  useEffect(() => {
    const numberOfAnswers = (option: string, index: number) => {
      let counter = 0;
      if (replies) {
        for (let i = 0; i < replies.length; i += 1) {
          if (replies[i].replies[index].answers.includes(option)) {
            counter += 1;
          }
        }
      }
      return counter;
    };

    const returnCount = (questionOptions: string[], index: number) => {
      const counter = questionOptions.map((option) =>
        numberOfAnswers(option, index),
      );
      return counter;
    };
    setRepliesCounter(
      currentSurvey?.questions.map((question, index) =>
        returnCount(question.options, index),
      ),
    );
  }, [currentSurvey?.questions, replies]);

  return (
    // <div className="flex flex-col items-center p-8 form-component">
    //   <Card className="ml-3/12 mr-3/12 p-7">
    <div className="flex flex-col items-center justify-center p-4 sm:px-4 md:px-20 lg:px-48">
      <Card className="p-7 w-full" style={{ minWidth: 300, maxWidth: 600 }}>
        <CardHeader className="mb-7 p-0"> My surveys</CardHeader>
        <p className="p-0 m-0 mb-7">Number of answers: {replies?.length}</p>
        <div className=" flex flex-col gap-2">
          {repliesCounter &&
            replies &&
            currentSurvey?.questions.map((question, index) => (
              <QuestionItemStat
                key={`${question.description}, ${question.id}`}
                item={question}
                index={index}
                repliesCounter={repliesCounter[index]}
                replies={replies}
              />
            ))}
        </div>
        <CardFooter className="p-0 pt-7 m-0">
          {/* <Button className=" w-full" size="lg" radius="none">
            export to pdf
          </Button> */}
        </CardFooter>
      </Card>
    </div>
  );
}

export default Page;
