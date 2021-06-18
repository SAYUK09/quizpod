import { useState, useEffect } from "react";
import axios from "axios";
import "./Quiz.css";
import { useQuiz } from "../../contexts/Quiz-Context";
import { Modals } from "../Modal/Modal";
import { Timer } from "../Timer/Timer";

import { useParams } from "react-router-dom";

import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import BubbleChartIcon from "@material-ui/icons/BubbleChart";
import Button from "@material-ui/core/Button";
import { DragHandle } from "@material-ui/icons";

export function Quiz() {
  const { id } = useParams();
  const { state, dispatch } = useQuiz();

  useEffect(() => {
    (async function () {
      try {
        const response = await axios.get(
          `https://Quiz-App-API.sayuk.repl.co/${id}`
        );
        console.log(response.data, "ressss");

        dispatch({ type: "SET_DATA", payload: { data: response.data } });
      } catch (err) {
        console.log(err, "errr");
      }
    })();
  }, []);

  console.log(state.data.questions);

  const useChip = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        "& > *": {
          margin: theme.spacing(0.5),
          // fontWeight: "bolder",
          alignItems: "center",
          color: "white",
        },
      },
    })
  );

  const useButton = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        "& > *": {
          margin: theme.spacing(1),
          color: "white",
          padding: "0rem",
        },
      },
    })
  );

  const useSecButton = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        "& > *": {
          margin: theme.spacing(1),
          color: "color",
        },
      },
    })
  );

  const chip = useChip();
  const button = useButton();
  const secBtn = useSecButton();

  const [selected, setSelected] = useState("");

  console.log(selected, "sell");

  const checkHandler = (selectedAns: any) => {
    if (selected === selectedAns && selectedAns.isRight === false)
      return "wrong";
    else if (selectedAns.isRight === true) return "right";
  };

  return (
    <>
      {state.showModal && <Modals />}

      <div className="quizParent">
        <div className="quizBody">
          <Timer />
          <div className="headContainer">
            <h3>
              {" "}
              <BubbleChartIcon /> {state.data.quizName}
            </h3>
            <Chip
              className={chip.root}
              variant="outlined"
              size="small"
              label={state.status}
            />
          </div>

          <div className="scoreContainer">
            <p>Score : {state.score}</p>
          </div>

          <div className="quesContainer">
            <h3>
              Q :{" "}
              {state.data.questions.length &&
                state.data.questions[state.currentQsNo].question}
            </h3>
          </div>

          <div className="optDiv">
            {state.data.questions.length &&
              state.data.questions[state.currentQsNo].options.map(
                (item: any) => (
                  <button
                    className={`singleOption  ${
                      selected && checkHandler(item)
                    }`}
                    disabled={state.disable}
                    onClick={() => {
                      setSelected(item);
                      dispatch({ type: "TOGGLE_DISABLE" });

                      if (item.isRight) {
                        dispatch({
                          type: "RIGHT_ANS",
                          payload: {
                            score:
                              state.data.questions[state.currentQsNo].points,
                          },
                        });
                      } else {
                        dispatch({
                          type: "WRONG_ANS",
                          payload: {
                            score:
                              state.data.questions[state.currentQsNo].points,
                          },
                        });
                      }
                    }}
                  >
                    {item.answer}
                  </button>
                )
              )}
          </div>

          <div className="submitButtonDiv">
            <Button
              onClick={() => {
                setSelected("");
                dispatch({ type: "RESET" });
              }}
              className={button.root}
              variant="contained"
              color="primary"
            >
              Reset
            </Button>

            <Button
              onClick={() => {
                setSelected("");

                dispatch({ type: "TOGGLE_DISABLE" });

                dispatch({ type: "NEXT_QUE" });
              }}
              className={secBtn.root}
              variant="outlined"
              color="primary"
            >
              Skip
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
