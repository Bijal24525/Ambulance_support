import React, { useState, useMemo } from "react";
import { Router, Switch, Route } from "react-router-dom";
import { LoginContext } from "../hooks/LoginContext";

import history from "./history";

import Login from "../screens/Login";
import Home from "../screens/Home";
import DriverList from "../screens/Driver List";
import TrafficList from "../screens/Traffic List";

function Routes() {
  const [success, setSuccess] = useState(true);
  const [Dusers, setDusers] = useState([]);
  const [Tusers, setTusers] = useState([]);
  const providerValue = useMemo(
    () => ({
      success,
      setSuccess,
      Dusers,
      setDusers,
      Tusers,
      setTusers,
    }),
    [success, setSuccess, Dusers, setDusers, Tusers, setTusers]
  );
  return (
    <Router history={history}>
      <Switch>
        <LoginContext.Provider value={providerValue}>
          <Route path="/" exact component={Login} />
          <Route path="/Home" component={Home} />
          <Route path="/Dlist" component={DriverList} />
          <Route path="/Tlist" component={TrafficList} />
        </LoginContext.Provider>
      </Switch>
    </Router>
  );
}

export default Routes;
