import React, { useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

import { useQuiz } from "../../contexts/Quiz-Context";

export function Modals() {
  const { state, dispatch } = useQuiz();

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      },
      paper: {
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3)
      }
    })
  );

  const classes = useStyles();
  const [open, setOpen] = useState(true);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {/* <button type="button" onClick={handleOpen}>
        react-transition-group
      </button> */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <div onClick={handleOpen} className={classes.paper}>
            <h3 id="transition-modal-title">Thanks for Playing</h3>
            <h5>Your Final Score is {state.score} !</h5>

            <button
              onClick={() => {
                dispatch({ type: "RESET" });
              }}
            >
              Start Over
            </button>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
