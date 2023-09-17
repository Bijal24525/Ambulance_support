import { useState } from "react";
import history from "../navigation/history";

const useDrawer = () => {
  const [left, setLeft] = useState(false);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setLeft({ left, [anchor]: open });
  };

  function routeHome(e) {
    e.preventDefault();
    history.push("/Home");
  }

  function routeDlist(e) {
    e.preventDefault();
    history.push("/Dlist");
  }

  function routeTlist(e) {
    e.preventDefault();
    history.push("/Tlist");
  }

  function handleLogout(e) {
    e.preventDefault();
    history.push("/");
  }

  return {
    left,
    setLeft,
    toggleDrawer,
    routeHome,
    routeDlist,
    routeTlist,
    handleLogout,
  };
};

export default useDrawer;
