import React from "react";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";

import GetTable from "../GetTable";

import * as D from "./styles";

const TableView = ({ type }) => {
  return (
    <TableContainer component={Paper} style={D.table}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={D.head}>Name</TableCell>
            <TableCell align="right" style={D.head}>
              Contact
            </TableCell>
            <TableCell align="right" style={D.head}>
              Email
            </TableCell>
            <TableCell align="right" style={D.head}>
              Location
            </TableCell>
            {type === "driver" ? (
              <TableCell align="right" style={D.head}>
                Driver ID
              </TableCell>
            ) : null}
          </TableRow>
        </TableHead>
        <TableBody>
          <GetTable type={type} />
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default React.memo(TableView);
