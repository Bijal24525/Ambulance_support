import { useState, useEffect, useContext } from "react";
import { LoginContext } from "./LoginContext";
import axios from "axios";

import { toast } from "react-toastify";

const useUpdate = (o_contact, type) => {
  const { Dusers, Tusers } = useContext(LoginContext);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [driver_id, setDriverId] = useState("");
  const [location, setLocation] = useState("");
  const [user, setUser] = useState(null);
  const [urls, setUrl] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (type === "driver") {
      setUrl(process.env.REACT_APP_BASE_URL + "get_driver_pic/" + o_contact);
      const data = Dusers.filter((user) => user.contact === parseInt(o_contact));
      if (data.length > 0) {
        setUser(data[0]);
        setName(data[0].name);
        setContact(data[0].contact);
        setEmail(data[0].email);
        setDriverId(data[0].driver_id);
        setLocation(data[0].location);
      }
    } else {
      setUrl(process.env.REACT_APP_BASE_URL + "get_traffic_pic/" + o_contact);
      const data = Tusers.filter((user) => user.contact === parseInt(o_contact));
      if (data.length > 0) {
        setUser(data[0]);
        setName(data[0].name);
        setContact(data[0].contact);
        setEmail(data[0].email);
        setDriverId(data[0].driver_id);
        setLocation(data[0].location);
      }
    }
    setLoading(false);
  }, [Dusers, Tusers, o_contact, type]);

  const handleDriverUpdate = async (e) => {
    e.preventDefault();

    await axios
      .put(`/driver/` + o_contact, { name, email, driver_id, location, contact }, {})
      .then((response) => {
        console.log(response.data);
        toast.success("successfully updated!");
        window.location.reload(false);
      })
      .catch((error) => {
        toast.error("failed to update!");
        console.log(error);
      });
  };

  const handleTrafficUpdate = async (e) => {
    e.preventDefault();

    await axios
      .put(`/traffic/` + o_contact, { name, email, contact, location }, {})
      .then((response) => {
        console.log(response.data);
        toast.success("successfully updated!");
        window.location.reload(false);
      })
      .catch((error) => {
        toast.error("failed to update!");
        console.log(error);
      });
  };

  return {
    user,
    urls,
    handleDriverUpdate,
    handleTrafficUpdate,
    name,
    setName,
    email,
    setEmail,
    contact,
    setContact,
    driver_id,
    setDriverId,
    location,
    setLocation,
    loading,
  };
};

export default useUpdate;




// import { useState, useEffect, useContext } from "react";
// import { LoginContext } from "./LoginContext";
// import axios from "axios";

// import { toast } from "react-toastify";

// const useUpdate = (o_contact, type) => {
//   const { Dusers, Tusers } = useContext(LoginContext);
//   const [name, setName] = useState("");
//   const [contact, setContact] = useState("");
//   const [email, setEmail] = useState("");
//   const [driver_id, setDriverId] = useState("");
//   const [user, setUser] = useState(null);
//   const [urls, setUrl] = useState("");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (type === "driver") {
//       setLoading(true);
//       setUrl(process.env.REACT_APP_BASE_URL + "get_driver_pic/" + o_contact);
//       const data = Dusers.filter((user) => {
//         return user.contact === parseInt(o_contact);
//       });
//       setUser(data[0]);
//       setName(data[0].name);
//       setContact(data[0].contact);
//       setEmail(data[0].email);
//       setDriverId(data[0].driver_id);
//       setLoading(false);
//     } else {
//       setUrl(process.env.REACT_APP_BASE_URL + "get_traffic_pic/" + o_contact);
//       setLoading(true);
//       const data = Tusers.filter((user) => {
//         return user.contact === parseInt(o_contact);
//       });
//       setUser(data[0]);
//       setName(data[0].name);
//       setContact(data[0].contact);
//       setEmail(data[0].email);
//       setDriverId(data[0].driver_id);
//       setLoading(false);
//     }
//   }, [Dusers, Tusers, o_contact, type]);

//   const handleDriverUpdate = async (e) => {
//     e.preventDefault();

//     await axios
//       .put(
//         `/driver/` + o_contact,
//         {
//           // data to be sent
//           name,
//           email,
//           driver_id,
//           contact,
//         },
//         {}
//       )
//       .then((response) => {
//         console.log(response.data);
//         toast.success("succesfully updated!");
//         window.location.reload(false);
//       })
//       .catch((error) => {
//         toast.error("failed to update!");
//         console.log(error);
//       });
//   };

//   const handleTrafficUpdate = async (e) => {
//     e.preventDefault();

//     await axios
//       .put(
//         `/traffic/` + o_contact,
//         {
//           // data to be sent
//           name,
//           email,
//           contact,
//         },
//         {}
//       )
//       .then((response) => {
//         console.log(response.data);
//         toast.success("succesfully updated!");
//         window.location.reload(false);
//       })
//       .catch((error) => {
//         toast.error("failed to update!");
//         console.log(error);
//       });
//   };

//   return {
//     user,
//     urls,
//     handleDriverUpdate,
//     handleTrafficUpdate,
//     name,
//     setName,
//     email,
//     setEmail,
//     contact,
//     setContact,
//     driver_id,
//     setDriverId,
//     loading,
//   };
// };

// export default useUpdate;
