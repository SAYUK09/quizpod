import "./Nav.css";
import { useState } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import ExtensionIcon from "@material-ui/icons/Extension";

import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import { makeStyles } from "@material-ui/core/styles";

export function Nav() {
  const [value, setValue] = useState("recents");
  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };

  const useStyles = makeStyles({
    root: {
      background: "#3b82f6",
      display: "flex",
      justifyContent: "space-between"
    }
  });

  const navLabel = makeStyles({
    label: {
      color: "white"
    }
  });
  const classes = useStyles();
  const labelClass = navLabel();
  return (
    <>
      <BottomNavigation
        className={classes.root}
        value={value}
        onChange={handleChange}
      >
        <div className="navLogo">
          <h3>QuizPod</h3>
        </div>

        <Link to="/">
          <BottomNavigationAction
            className={labelClass.label}
            label="Home"
            value="favorites"
            icon={<HomeRoundedIcon />}
          />
        </Link>

        <Link to="/quiz">
          <BottomNavigationAction
            className={labelClass.label}
            label="Quiz"
            value="nearby"
            icon={<ExtensionIcon />}
          />
        </Link>
      </BottomNavigation>
    </>
  );
}
