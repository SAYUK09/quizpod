import "./Timer.css";
import { useQuiz } from "../../contexts/Quiz-Context";
import React from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import type { Options } from "../Quiz/Quiz";

export type TimerProp = {
  setter: React.Dispatch<React.SetStateAction<Options | null>>;
};

export function Timer({ setter }: TimerProp) {
  const { state, dispatch } = useQuiz();

  return (
    <div className="App">
      <CountdownCircleTimer
        isPlaying={
          state.data.questions.length - state.currentQsNo === 1 ? false : true
        }
        size={120}
        duration={15}
        strokeWidth={6}
        key={state.currentQsNo}
        onComplete={() => {
          dispatch({ type: "NEXT_QUE" });
          console.log(setter);
          setter(null);
          return [true, 0];
        }}
        colors={[
          ["#004777", 0.33],
          ["#F7B801", 0.33],
          ["#A30000", 0.33],
        ]}
      >
        {({ remainingTime }) => remainingTime}
      </CountdownCircleTimer>
    </div>
  );
}
