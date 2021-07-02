export type Quiz = {
  quizName: string;
  questions: Questions[];
  quizDetails: QuizDetails;
};

export type QuizDetails = {
  noOfQuestions: number;
  difficulty: string;
  timeForEachQues: number;
  totalPoints: number;
};

export type Questions = {
  id: string;
  question: string;
  points: number;
  negativePoints: number;
  options: Options[];
};

export type Options = {
  answer: string;
  isRight: boolean;
};
