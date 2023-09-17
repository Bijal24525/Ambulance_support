import React, { useContext } from "react";
import { TableCell, TableRow } from "@material-ui/core";
import useDriverData from "../../hooks/useDriverData";
import useTrafficData from "../../hooks/useTrafficData";

import { LoginContext } from "../../hooks/LoginContext";

const GetTable = ({ type }) => {
  const { loading } = useDriverData();
  const { T_loading } = useTrafficData();
  const { Dusers, Tusers } = useContext(LoginContext);
  if (loading || T_loading) {
    return (
      <TableRow key={"name"}>
        <TableCell component="th" scope="row" style={cell}>
          -
        </TableCell>
        <TableCell style={cell}>-</TableCell>
        <TableCell style={cell}>-</TableCell>
        {type === "driver" ? <TableCell style={cell}>-</TableCell> : null}
      </TableRow>
    );
  } else {
    if (type === "driver") {
      return Dusers.map((row) => (
        <TableRow key={row.contact}>
          <TableCell component="th" scope="row" style={cell}>
            {row.name}
          </TableCell>
          <TableCell style={cell}>{row.contact}</TableCell>
          <TableCell style={cell}>{row.email}</TableCell>
          <TableCell style={cell}>{row.location}</TableCell>
          <TableCell style={cell}>{row.driver_id}</TableCell>
        </TableRow>
      ));
    } else {
      return Tusers.map((row) => (
        <TableRow key={row.contact}>
          <TableCell component="th" scope="row" style={cell}>
            {row.name}
          </TableCell>
          <TableCell style={cell}>{row.contact}</TableCell>
          <TableCell style={cell}>{row.email}</TableCell>
          <TableCell style={cell}>{row.location}</TableCell>
        </TableRow>
      ));
    }
  }
};

const cell = {
  textAlign: "center",
};

export default React.memo(GetTable);
