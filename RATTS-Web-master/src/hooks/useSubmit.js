import { useState } from "react";
import axios from "axios";

import { toast } from "react-toastify";

const useSubmit = () => {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [driver_id, setDriverId] = useState("");
  const [location, setLocation] = useState("");
  const [password, setPassword] = useState("");
  // const [upload, setUpload] = useState();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);
  const [url, setUrl] = useState(null);
  // const driver_pic =
  //   process.env.REACT_APP_BASE_URL + "/update_driver_pic/" + contact;
  // const traffic_pic =
  //   process.env.REACT_APP_BASE_URL + "/update_traffic_pic/" + contact;

  const handleClose = () => {
    setSuccess(false);
    setFail(false);
  };

  // const handleDriverUpload = async () => {
  //   // if (upload == null) {
  //   //   alert("Submit form and choose image before upload.");
  //   // } else {
  //     let file = new FormData();
  //     // file.append("file", upload, upload.name);
  //     file.append("file");
  //     await axios
  //       .post(driver_pic, file, {})
  //       .then((response) => {
  //         console.log(response.statusText, "Sent image!!!!!");
  //         toast.success("Successfully uploaded image.");
  //       })
  //       .catch((error) => {
  //         setFail(true);
  //         console.log(error);
  //       });
  //   // }
  // };

  // function handlePreview(e) {
  //   e.preventDefault();
  //   if (upload == null) {
  //     toast.warn("Choose an image to preview.");
  //   } else {
  //     const objectUrl = URL.createObjectURL(upload);
  //     setUrl(objectUrl);
  //   }
  // }

  function resetForm() {
    setName("");
    setContact("");
    setEmail("");
    setDriverId("");
    setLocation("");
    setPassword("");
    // setUpload(null);
  }

  const postData = async (e) => {
    e.preventDefault();
    setLoading(true);
    // if (!upload) {
    //   toast.error("Please upload an image!");
    //   setLoading(false);
    //   return;
    // }

    //API call here
    // if (upload) {
      await axios
        .post(
          process.env.REACT_APP_BASE_URL + `/driver_signup`,
          {
            // data to be sent
            name,
            email,
            password,
            driver_id,
            location,
            contact,
          },
          {}
        )
        .then((response) => {
          // handleDriverUpload();
          setSuccess(true);
          resetForm();
        })
        .catch((error) => {
          setFail(true);
          console.log(error);
        });
    // }

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const postTrafficData = async (e) => {
    e.preventDefault();
    setLoading(true);

    // if (!upload) {
    //   toast.error("Please upload an image!");
    //   setLoading(false);
    //   return;
    // }

    //API call here
    // if (upload) {
      await axios
        .post(process.env.REACT_APP_BASE_URL + `/traffic_signup`, {
          // data to be sent
          name,
          email,
          password,
          location,
          contact,
        })
        .then((response) => {
          console.log(response.data);
          // handleTrafficUpload();
          setSuccess(true);
        })
        .catch((error) => {
          setFail(true);
          console.log(error);
        });
    // }

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  // const handleTrafficUpload = async () => {
  //   if (upload == null) {
  //     alert("Submit form and choose image before upload.");
  //   } else {
  //     let file = new FormData();
  //     file.append("file", upload, upload.name);
  //     await axios
  //       .post(traffic_pic, file, {})
  //       .then((response) => {
  //         toast.success("Successfully uploaded image.");
  //         resetForm();
  //       })
  //       .catch((error) => {
  //         setFail(true);
  //         console.log(error);
  //       });
  //   }
  // };

  return {
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
    password,
    setPassword,
    postData,
    postTrafficData,
    // url,
    // setUpload,
    // handlePreview,
    loading,
    success,
    handleClose,
    fail,
  };
};

export default useSubmit;
