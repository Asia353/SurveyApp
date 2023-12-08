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
