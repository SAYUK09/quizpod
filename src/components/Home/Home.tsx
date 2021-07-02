import React from "react";
import { useState } from "react";
import ArrowForwardIosRoundedIcon from "@material-ui/icons/ArrowForwardIosRounded";
import Button from "@material-ui/core/Button";
import { BrowserRouter as Router, Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import "./Home.css";
import { red } from "@material-ui/core/colors";

export function Home() {
  const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
      backgroundColor: "#3b82f6",
      fontSize: "1rem"
      // color:"white"
    }
  }));

  const classes = useStyles();

  return (
    <>
      <div className="homeParent">
        <div className="homeBody">
          <div className="headText">
            <h3>Let's test your knowledge.</h3>
            <h1>
              Ever thought of <span className="spanText"> Podcasting </span>!
            </h1>
            <h4>Here's a Fun Quiz.</h4>
          </div>

          <div className="btnContainer">
            <Link className="routerLink" to="/quiz">
              <Button className={classes.button} variant="contained">
                Take a Quiz
                <ArrowForwardIosRoundedIcon />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
