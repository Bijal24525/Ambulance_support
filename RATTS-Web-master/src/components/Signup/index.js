import React, { useState } from "react";

import { Button, ButtonGroup } from "@material-ui/core";

import * as S from "./styles";

import Driver from "../../screens/Driver";
import Traffic from "../../screens/Traffic";

function Signup() {
  const [toggle, setToggle] = useState(true);

  function renderScreen() {
    if (toggle === true) {
      return <Driver />;
    } else {
      return <Traffic />;
    }
  }

  return (
    <React.Fragment>
      <ButtonGroup
        variant="contained"
        aria-label="outlined secondary button group"
        style={S.container}
      >
        <Button
          style={S.button}
          onClick={e => {
            e.preventDefault();
            setToggle(true);
          }}
        >
          Driver Signup
        </Button>
        <Button
          style={S.button}
          onClick={e => {
            e.preventDefault();
            setToggle(false);
          }}
        >
          Traffic Signup
        </Button>
      </ButtonGroup>
      {renderScreen()}
    </React.Fragment>
  );
}

export default Signup;
