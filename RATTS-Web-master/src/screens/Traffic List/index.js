import React, { useState } from "react";

import { Box, FormControlLabel, Switch } from "@material-ui/core";

import NavBar from "../../components/NavBar";
import TableView from "../../components/TableView";
import Cards from "../../components/Cards";
import * as T from "./styles";

const TrafficList = () => {
  const [view, setView] = useState(true);
  return (
    <>
      <NavBar />

      <Box component="div" style={T.container}>
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
          <Box component="div" style={T.cardsContainer}>
            <Cards />
          </Box>
        ) : (
          <TableView />
        )}
      </Box>
    </>
  );
};

export default TrafficList;
