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
import { writeAnswers } from "../FirebaseFunctions";
import { Reply, Survey } from "../types";
import { useSurveyContext } from "../contexts/SurveysContext";

function Page() {
  const context = useSurveyContext();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const surveyId = Number(searchParams.get("surveyid"));

  // const [isEdit, setIsEdit] = useState(false);

  const [usersReplies, setUsersReplies] = useState<Reply[]>([]);
  const [currentSurvey, setCurrentSurvey] = useState<Survey>();

  useEffect(() => {
    const survey = context.surveysList.find(
      (element) => element.id === surveyId,
    );
    if (survey) {
      setUsersReplies(
        survey.questions.map((question) => ({
          questionId: question.id,
          type: question.type,
          answers: [""],
        })),
      );
      setCurrentSurvey(survey);
    }
  }, [context.surveysList, surveyId]);

  const updateAnswers = (questionId: number, newAnswers: string[]) => {
    setUsersReplies(
      usersReplies.map((reply) =>
        reply.questionId === questionId
          ? { ...reply, answers: newAnswers }
          : reply,
      ),
    );
  };

  return (
    <div>
      {currentSurvey ? (
        <div className="flex flex-col items-center p-8 form-component">
          <Card className="survey-component">
            <CardHeader className="p-7 flex flex-row justify-between">
              {currentSurvey?.name}
            </CardHeader>
            <CardBody className="m-0 p-0">
              {currentSurvey?.questions.map((element) => (
                <>
                  <Divider key={(element.description, 1)} />
                  <QuestionForm
                    key={element.description}
                    question={element}
                    // index={index}
                    updateAnswers={updateAnswers}
                  />
                </>
              ))}
            </CardBody>
            <CardFooter className="p-0 pt-7 m-0">
              <Button
                className=" w-full"
                size="lg"
                radius="none"
                onClick={() => writeAnswers(surveyId, usersReplies)}
              >
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
