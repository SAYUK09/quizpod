import { useState, useEffect } from "react";
import axios from "axios";
import "./Quiz.css";
import { useQuiz } from "../../contexts/Quiz-Context";
import { Modals } from "../Modal/Modal";
import { Timer } from "../Timer/Timer";
import { useParams } from "react-router-dom";
import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import BubbleChartIcon from "@material-ui/icons/BubbleChart";
import Button from "@material-ui/core/Button";
import Loader from "react-loader-spinner";

export type Ques = {
  id: string;
  points: number;
  negativePoints: number;
  options: Options[];
};

export type Options = {
  answer: string;
  isRight: boolean;
};

export function Quiz() {
  const { id } = useParams();
  const { state, dispatch } = useQuiz();

  useEffect(() => {
    (async function () {
      try {
        const response = await axios.get(
          `https://Quiz-App-API.sayuk.repl.co/${id}`
        );

        dispatch({ type: "SET_DATA", payload: { data: response.data } });
      } catch (err) {
        console.log(err, "errr");
      }
    })();
  }, []);

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

  const [selected, setSelected] = useState<Options | null>(null);

  const checkHandler = (selectedAns: Options) => {
    console.log(selectedAns, "selected ans");
    if (selected === selectedAns && selectedAns.isRight === false)
      return "wrong";
    else if (selectedAns.isRight === true) return "right";
  };

  return (
    <>
      {state.showModal && <Modals />}

      <div className="quizParent">
        <div className="quizBody">
          {state.data.questions.length ? (
            <Timer />
          ) : (
            <Loader type="TailSpin" color="#F59E0B" height={150} width={150} />
          )}

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

          {console.log(state.data.questions)}

          <div className="optDiv">
            {state.data.questions.length &&
              state.data.questions[state.currentQsNo].options.map(
                (item: Options) => (
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
                setSelected(null);
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
                setSelected(null);

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
