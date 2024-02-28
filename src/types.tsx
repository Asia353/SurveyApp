export enum QuestionType {
  Open = "open",
  OneOption = "one option",
  ManyOptions = "many options",
}

// import { questionTypeList } from "./features/addSurvey/QuestionForm";

// export type QuestionType = (typeof questionTypeList)[1];

export type Question = {
  description: string;
  type: QuestionType;
  id: number;
  options: string[];
};

export type Survey = {
  name: string;
  id: string;
  userId: string;
  questions: Question[];
  published: boolean;
};

export type Reply = {
  questionId: number;
  type: QuestionType;
  answers: string[];
};

export type RepliesList = {
  surveyId: string;
  userName: string;
  replies: Reply[];
};

export type User = {
  userId: string;
  email: string;
};
