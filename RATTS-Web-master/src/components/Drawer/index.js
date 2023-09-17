import React, { useContext } from "react";

import useDrawer from "../../hooks/useDrawer";
import { LoginContext } from "../../hooks/LoginContext";
import { Drawer, Divider, IconButton, Typography } from "@material-ui/core";

import ListIcon from "../ListIcon";

import MenuIcon from "@material-ui/icons/Menu";
import HomeIcon from "@material-ui/icons/Home";
import DriveEtaIcon from "@material-ui/icons/DriveEta";
import TrafficIcon from "@material-ui/icons/Traffic";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";

import * as D from "./styles";

export default function TemporaryDrawer() {
  const {
    left,
    toggleDrawer,
    routeHome,
    routeDlist,
    routeTlist,
    handleLogout,
  } = useDrawer();

  const { success } = useContext(LoginContext);

  const list = (anchor) => (
    <div
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
      style={{ width: 250 }}
    >
      <Typography style={D.title}>Menu</Typography>
      <Divider />
      <ListIcon text={"Home"} icon={<HomeIcon />} onSubmit={routeHome} />
      {success ? (
        <>
          <ListIcon
            text={"Driver List"}
            icon={<DriveEtaIcon />}
            onSubmit={routeDlist}
          />
          <ListIcon
            text={"Traffic List"}
            icon={<TrafficIcon />}
            onSubmit={routeTlist}
          />
        </>
      ) : null}

      <ListIcon
        text={success ? "Logout" : "Login"}
        icon={<MeetingRoomIcon />}
        onSubmit={handleLogout}
      />
    </div>
  );

  return (
    <div>
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(anchor, true)}
          >
            <MenuIcon fontSize="large" />
          </IconButton>
          <Drawer
            anchor={anchor}
            open={left[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
