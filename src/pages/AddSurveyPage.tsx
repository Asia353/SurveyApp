import React, { useState } from "react";
import "./AddSurveyPage.css";
import { Button } from "@nextui-org/react";

function Page() {
  const [questionsList, setQuestionsList] = useState<string[]>(["Ddd"]);
  //   const gowno = "gówno";

  function addQuestion(element: string) {
    // const element = "asjdhakshdfila";
    setQuestionsList((x) => [...x, element]);
  }

  return <div>{questionsList}</div>;
}

export default Page;
