import { useState, useEffect, useContext } from "react";
import { LoginContext } from "./LoginContext";
import axios from "axios";

const useTrafficData = () => {
  const [T_loading, setLoading] = useState(true);
  const { setTusers } = useContext(LoginContext);

  useEffect(() => {
    axios
    .get("http://127.0.0.1:5000/traffic")
      // .get(process.env.REACT_APP_BASE_URL + "/traffic")
      .then((res) => {
        setTusers(Array.from(res.data).sort(compare));
        setLoading(false);
      })
      .catch((e) => {
        return console.log(e);
      });
  }, [setTusers]);

  function compare(a, b) {
    // Use toUpperCase() to ignore character casing
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();

    let comparison = 0;
    if (nameA > nameB) {
      comparison = 1;
    } else if (nameA < nameB) {
      comparison = -1;
    }
    return comparison;
  }

  return { T_loading };
};

export default useTrafficData;
