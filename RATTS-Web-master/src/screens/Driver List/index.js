import React, { useState } from "react";

import { Box, FormControlLabel, Switch } from "@material-ui/core";

import NavBar from "../../components/NavBar";
import TableView from "../../components/TableView";
import Cards from "../../components/Cards";

import * as D from "./styles";

const DriverList = () => {
  const [view, setView] = useState(true);

  return (
    <>
      <NavBar />

      <Box component="div" style={D.container}>
        <FormControlLabel
          control={
            <Switch
              checked={view}
              onChange={() => setView(!view)}
              name={view ? "Cards" : "Table"}
            />
          }
          label={view ? "Cards" : "Table"}
        />
        {view ? (
          <Box component="div" style={D.cardsContainer}>
            <Cards type="driver" />
          </Box>
        ) : (
          <TableView type="driver" />
        )}
      </Box>
    </>
  );
};

export default React.memo(DriverList);
