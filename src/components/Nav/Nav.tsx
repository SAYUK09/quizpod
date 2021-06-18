import "./Nav.css";
import { useState } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import ExtensionIcon from "@material-ui/icons/Extension";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import PersonIcon from "@material-ui/icons/Person";
import { BsFillPersonFill } from "react-icons/bs";
import { makeStyles } from "@material-ui/core/styles";
import { LogoutButton } from "../../auth/Login/LogoutButton";
import { LoginButton } from "../../auth/Login/LoginButton";
import { LinkClassKey } from "@material-ui/core";

export function Nav() {
  const [value, setValue] = useState("recents");
  const { user } = useAuth0();
  console.log(user);

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };

  const useStyles = makeStyles({
    root: {
      background: "#3b82f6",
      display: "flex",
      justifyContent: "space-between",
    },
  });

  const navLabel = makeStyles({
    label: {
      color: "white",
    },
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
        {user ? (
          <Link className="routerLinkProfile" to="login">
            <span className="profileIcon">
              <BsFillPersonFill />
            </span>
            <div className="userDetails">
              {user.name} <p>{user.email}</p>{" "}
            </div>
          </Link>
        ) : (
          <LoginButton />
        )}
      </BottomNavigation>
    </>
  );
}
