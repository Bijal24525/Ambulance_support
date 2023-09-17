import React from "react";
import {
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";

const ListIcon = ({ text, icon, onSubmit }) => {
  return (
    <React.Fragment>
      <List>
        <ListItem button key={text} onClick={e => onSubmit(e)}>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={text} />
        </ListItem>
      </List>
      <Divider />
    </React.Fragment>
  );
};

export default ListIcon;
