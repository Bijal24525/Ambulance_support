import React, { useContext } from "react";

import { AppBar, Toolbar, Avatar, Typography, Button } from "@material-ui/core";

import TemporaryDrawer from "../Drawer";
import history from "../../navigation/history";
import * as N from "./styles";
import Logo from "../../assets/logo.png";
import { LoginContext } from "../../hooks/LoginContext";

function NavBar() {
  const { success } = useContext(LoginContext);
  function handleLogout(e) {
    e.preventDefault();
    history.push("/");
  }

  return (
    <AppBar position="static" style={N.Nav}>
      <Toolbar>
        <TemporaryDrawer />
        <Typography variant="h4" style={N.Title}>
          <Avatar alt="logo" src={Logo} style={N.Logo} />
          ARTS App Signup Portal
        </Typography>
        <Button color="inherit" onClick={handleLogout}>
          {success ? "Logout" : "Login"}
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
