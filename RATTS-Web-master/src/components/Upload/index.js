import React from "react";

import {
  Box,
  Button,
  ButtonGroup,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import { PhotoCamera } from "@material-ui/icons";

import * as U from "./styles";

const Upload = ({ setUpload, handlePreview }) => {
  return (
    <Box component="div" style={U.row}>
      <input
        accept="image/*"
        id="icon-button-file"
        type="file"
        name="file"
        onChange={(e) => setUpload(e.target.files[0])}
        style={{ display: "none" }}
      />
      <ButtonGroup aria-label="outlined primary button group">
        <Tooltip
          disableFocusListener
          disableTouchListener
          title="Preview image"
          placement="top"
        >
          <Button
            variant="outlined"
            color="secondary"
            onClick={(e) => handlePreview(e)}
          >
            Preview
          </Button>
        </Tooltip>
      </ButtonGroup>
      <label htmlFor="icon-button-file">
        <Tooltip
          disableFocusListener
          disableTouchListener
          title="Choose image"
          placement="top"
        >
          <IconButton
            color="secondary"
            aria-label="upload picture"
            component="span"
            style={U.icon}
          >
            <PhotoCamera />
          </IconButton>
        </Tooltip>
      </label>
    </Box>
  );
};

export default Upload;
