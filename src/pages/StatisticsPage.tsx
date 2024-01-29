import { Button, Card, CardFooter, CardHeader } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import "./Page.css";
import { useSurveyContext } from "../SurveysContext";
import { RepliesList, Survey } from "../types";
import * as FirebaseFunctions from "../FirebaseFunctions";
import QuestionItemStat from "../features/statisctics/QuestionItemStat";

function Page() {
  const context = useSurveyContext();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const surveyId = Number(searchParams.get("surveyid"));

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
      setReplies(await FirebaseFunctions.loadResultsFromFirestore(surveyId));
    };
    asyncFunctin();
  }, []);

  const numberOfAnswers = (option: string, index: number) => {
    let counter = 0;
    if (replies) {
      for (let i = 0; i < replies.length; i += 1) {
        if (replies[i].replies[index].answers.includes(option)) {
          counter += 1;
        }
      }
    }
    // console.log("counter: ", counter);

    return counter;
  };

  const returnCount = (questionOptions: string[], index: number) => {
    // console.log("question description: ", questionOptions);
    const counter = questionOptions.map((option) =>
      numberOfAnswers(option, index),
    );
    return counter;
  };

  useEffect(() => {
    setRepliesCounter(
      currentSurvey?.questions.map((question, index) =>
        returnCount(question.options, index),
      ),
    );
    // console.log("repliesCounter: ", repliesCounter);
  }, [replies]);

  return (
    <div className="flex flex-col items-center p-8 form-component">
      <Card className="survey-component p-7">
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
          <Button
            className=" w-full"
            size="lg"
            radius="none"
            // onClick={() => console.log(repliesCounter)}
          >
            export to pdf
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Page;
