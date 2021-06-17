import "./Quiz-Listing.css";
import { BrowserRouter as Router, Link } from "react-router-dom";
import ArrowForwardIosRoundedIcon from "@material-ui/icons/ArrowForwardIosRounded";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

import React from "react";

import ButtonGroup from "@material-ui/core/ButtonGroup";

export function QuizListing() {
  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      "& > *": {
        margin: theme.spacing(1),
        fontSize: "2rem"
      }
    }
  }));

  const classes = useStyles();

  return (
    <>
      <div className="QuizListingParent">
        <div className={classes.root}>
          <ButtonGroup
            orientation="vertical"
            color="primary"
            aria-label="vertical contained primary button group"
            variant="text"
          >
            <Link className="routerLink" to="/quiz/quiz1">
              <Button style={{ fontSize: "1.5rem", color: "#3b82f6" }}>
                Quiz 1{" "}
              </Button>
            </Link>

            <Link className="routerLink" to="/quiz/quiz1">
              <Button style={{ fontSize: "1.5rem", color: "#3b82f6" }}>
                Quiz 2{" "}
              </Button>
            </Link>
          </ButtonGroup>
        </div>
      </div>
    </>
  );
}
