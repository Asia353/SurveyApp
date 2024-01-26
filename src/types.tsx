export enum QuestionType {
  Open,
  OneOption,
  ManyOptions,
}

export type Question = {
  description: string;
  type: QuestionType;
  id: number;
  options: string[];
};

export type Survey = {
  name: string;
  id: number;
  questions: Question[];
  published: boolean;
};

export type Reply = {
  questionId: number;
  type: QuestionType;
  answers: string[];
};

export type RepliesList = { replies: Reply[]; sid: number };
