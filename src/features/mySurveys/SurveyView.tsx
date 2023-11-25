import React from "react";
import { Card } from "@nextui-org/react";

import { Survey } from "../../types";

function SurveyView({ survey }: { survey: Survey }) {
  return (
    <Card className="p-3">
      <div>{survey.name}</div>
    </Card>
  );
}

export default SurveyView;
