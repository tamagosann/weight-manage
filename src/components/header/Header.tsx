import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Container } from "@material-ui/core";
import { PrimaryButton, SecondaryButton } from "../UIKit";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  logIn,
  logOut,
  selectIsSignedIn,
  selectUsername,
} from "../../features/users/usersSlice";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1,
    },
    mr20: {
      marginRight: 10,
    },
    menu: {
      [theme.breakpoints.down("xs")]: {
        display: "none",
      },
    },
    drawer: {
      [theme.breakpoints.up("sm")]: {
        display: "none",
      },
    },
  })
);

const Header: React.FC = () => {
  const classes = useStyles();
  const isSignedIn = useAppSelector(selectIsSignedIn);
  const username = useAppSelector(selectUsername);
  const dispatch = useAppDispatch();
  const history = useHistory();
  return (
    <div className={classes.grow}>
      <AppBar>
        <Container maxWidth="lg">
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              onClick={() => history.push("/")}
            >
              <img
                src="https://firebasestorage.googleapis.com/v0/b/weight-manage-a1554.appspot.com/o/logo.png?alt=media&token=d6a8d10f-4f5f-43d3-b981-7b0e32c621c3"
                alt="logo"
              />
            </Typography>
            <div className={classes.grow} />
            {username && <Typography>こんにちは、{username}さん</Typography>}
            {!isSignedIn ? (
              <PrimaryButton
                label={"ログイン"}
                onClick={() => dispatch(logIn())}
              />
            ) : (
              <SecondaryButton
                label={"ログアウト"}
                onClick={() => dispatch(logOut())}
              />
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};
export default Header;
