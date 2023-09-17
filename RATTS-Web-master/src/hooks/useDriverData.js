import { useState, useEffect, useContext } from "react";
import { LoginContext } from "./LoginContext";
import axios from "axios";

const useDriverData = () => {
  const [loading, setLoading] = useState(true);
  const { setDusers } = useContext(LoginContext);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/driver")
      .then((res) => {
        setDusers(Array.from(res.data).sort(compare));
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [setDusers]);

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

  return { loading };
};

export default useDriverData;
