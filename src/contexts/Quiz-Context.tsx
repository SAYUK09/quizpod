import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
// import { quizDB } from "../components/Quiz/QuizDB";
import { Quiz } from "../types";

const initialState: initialStateType = {
  user: "",
  score: 0,
  status: "starting",
  currentQsNo: 0,
  currentquiz: "",
  correct: 0,
  wrong: 0,
  disable: false,
  showModal: false,
  data: {
    quizName: "",
    questions: [],
    quizDetails: {
      noOfQuestions: 0,
      difficulty: "",
      timeForEachQues: 0,
      totalPoints: 0,
    },
  },
};

type StatusType = "starting" | "finished" | "Running";

export type initialStateType = {
  user: string;
  score: number;
  status: StatusType;
  currentQsNo: number;
  currentquiz: string;
  correct: number;
  wrong: number;
  disable: boolean;
  showModal: boolean;
  data: Quiz;
};

type CxtState = {
  state: initialStateType;
  dispatch: React.Dispatch<any>;
};

type ActionType =
  | { type: "SET_DATA"; payload: { data: any } }
  | { type: "RESET" }
  | { type: "RIGHT_ANS"; payload: { score: number } }
  | { type: "NEXT_QUE" }
  | { type: "WRONG_ANS"; payload: { score: number } }
  | { type: "TOGGLE_DISABLE" };

// export const QuizContext = createContext({});
export const QuizContext = createContext<any>({});

export function redcFunc(
  redcState: initialStateType,
  action: ActionType
): initialStateType {
  switch (action.type) {
    case "SET_DATA":
      return { ...redcState, data: action.payload.data };
      break;
    case "RESET":
      return {
        ...redcState,
        score: 0,
        currentQsNo: 0,
        correct: 0,
        wrong: 0,
        disable: false,
        showModal: false,
      };

    case "RIGHT_ANS":
      return { ...redcState, score: redcState.score + action.payload.score };
      break;

    case "WRONG_ANS":
      return { ...redcState, score: redcState.score - action.payload.score };
      break;

    case "NEXT_QUE":
      if (redcState.currentQsNo + 1 < redcState.data.questions.length) {
        return {
          ...redcState,
          currentQsNo: redcState.currentQsNo + 1,
          disable: false,
        };
      } else {
        return {
          ...redcState,
          status: "finished",
          disable: true,
          showModal: true,
        };
      }

    case "TOGGLE_DISABLE":
      return { ...redcState, disable: !redcState.disable };

    default:
      return redcState;
      break;
  }
}

export const QuizProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(redcFunc, initialState);

  return (
    <QuizContext.Provider value={{ state, dispatch }}>
      {children}
    </QuizContext.Provider>
  );
};

export function useQuiz() {
  return useContext(QuizContext);
}
