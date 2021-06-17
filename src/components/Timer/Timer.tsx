import "./Timer.css";

import { useEffect, useState } from "react";
import { useQuiz } from "../../contexts/Quiz-Context";
import React from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

export function Timer() {
  const { state, dispatch } = useQuiz();

  return (
    <div className="App">
      <CountdownCircleTimer
        isPlaying
        duration={15}
        key={state.currentQsNo}
        onComplete={() => {
          dispatch({ type: "NEXT_QUE" });

          return [true, 0];
        }}
        colors={[
          ["#004777", 0.33],
          ["#F7B801", 0.33],
          ["#A30000", 0.33]
        ]}
      >
        {({ remainingTime }) => remainingTime}
      </CountdownCircleTimer>
    </div>
  );
}
