export type Question = {
  description: string;
  type: string;
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
  type: string;
  answers: string[];
};

export type RepliesList = { replies: Reply[]; sid: number };
