import React from "react";

import useUpdate from "../../hooks/useUpdate";

import {
  Box,
  // Avatar,
  TextField,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Button,
} from "@material-ui/core";

import * as E from "./styles";

const Edit = React.memo(({ title, open, handleClose, o_contact, type }) => {
  const {
    user,
    urls,
    handleDriverUpdate,
    handleTrafficUpdate,
    name,
    setName,
    email,
    setEmail,
    contact,
    setContact,
    location,
    setLocation,
    driver_id,
    setDriverId,
    loading,
  } = useUpdate(o_contact, type);

  function chooseUpdate(e) {
    if (type === "driver") {
      handleDriverUpdate(e);
    } else {
      handleTrafficUpdate(e);
    }
  }

  return (
    <Dialog
      open={open}
      onClose={() => handleClose()}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>

      <DialogContent>
      "Hello from edit": {user}
        {
        // loading || !user ? (
        //   <CircularProgress color="secondary" />
        // ) :
        // (
          <Box component="form" style={E.FormContainer}>
            
            {/* <Avatar style={{ width: 90, height: 90 }} src={urls} /> */}

            <Box style={E.Form}>
              <TextField
                label="Name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={E.Input}
              />
              <TextField
                label="Contact"
                type="number"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                style={E.Input}
              />
              <TextField
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={E.Input}
              />
              <TextField
                label="Location"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                style={E.Input}
              />
              {type === "driver" ? (
                <TextField
                  label="Driver Id"
                  type="text"
                  value={driver_id}
                  onChange={(e) => setDriverId(e.target.value)}
                  style={E.Input}
                />
              ) : null}
            </Box>
          </Box>
        // )
        }
      </DialogContent>
      <DialogActions>
        <Button onClick={(e) => chooseUpdate(e)} color="secondary">
          Save
        </Button>
        <Button onClick={handleClose} color="secondary">
          Exit
        </Button>
      </DialogActions>
    </Dialog>
  );
});

export default Edit;
