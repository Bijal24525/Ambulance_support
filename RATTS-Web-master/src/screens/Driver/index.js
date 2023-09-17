import React from "react";

// custom hooks
import useSubmit from "../../hooks/useSubmit";

// packages
import {
  Box,
  // Avatar,
  TextField,
  Typography,
  Container,
} from "@material-ui/core";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// components
import Buttons from "../../components/Button";
// import Upload from "../../components/Upload";
import Success from "../../components/Success";
import Failure from "../../components/Failure";

// assets
import Profile from "../../assets/Profile.jpg";

import * as D from "./styles";

const Driver = () => {
  const {
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
    // url,
    // setUpload,
    // handlePreview,
    loading,
    success,
    handleClose,
    fail,
  } = useSubmit();

  // function renderAvatar() {
  //   if (url == null) {
  //     return <Avatar style={D.avatar} alt="Dummy profile" src={Profile} />;
  //   } else {
  //     return <Avatar style={D.avatar} alt="Dummy profile" src={url} />;
  //   }
  // }

  return (
    <Container style={D.bg}>
      <Typography variant="h5" style={D.text}>
        Lets get you registered for ARTS Driver App!
      </Typography>
      {/* {renderAvatar()} */}
      <Box component="form" style={D.Form}>
        <TextField
          required
          label="Name"
          type="text"
          value={name}
          placeholder="Enter your name"
          onChange={(e) => setName(e.target.value)}
          style={D.input}
        />
        <TextField
          required
          label="Email"
          type="email"
          value={email}
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          style={D.input}
        />
        <TextField
          required
          label="Contact"
          type="number"
          value={contact}
          placeholder="Enter your mobile no."
          onChange={(e) => setContact(e.target.value)}
          style={D.input}
        />
        <TextField
          required
          label="Driver Id"
          type="text"
          value={driver_id}
          placeholder="Enter your driver id"
          onChange={(e) => setDriverId(e.target.value)}
          style={D.input}
        />
        <TextField
          required
          label="Location"
          type="text"
          value={location}
          placeholder="Enter work location"
          onChange={(e) => setLocation(e.target.value)}
          style={D.input}
        />
        <TextField
          required
          label="Password"
          type="password"
          value={password}
          placeholder="Enter your password"
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
          style={D.input}
        />

        {/* <Upload setUpload={setUpload} handlePreview={handlePreview} /> */}

        {/* submit button */}
        <Buttons title="Submit" loading={loading} onSubmit={postData} />
        <Success
          title={"Ambulance Driver"}
          open={success}
          handleClose={handleClose}
        />
        <Failure
          open={fail}
          handleClose={handleClose}
          title={"Failed Registration!"}
          message={
            "Error processing data. Please fill all (*) required data and try again."
          }
        />
      </Box>
      <ToastContainer />
    </Container>
  );
};

export default Driver;
