import background from "../../assets/bg.png";

export const bg = {
  display: "flex",
  flexDirection: "column",
  maxWidth: "100%",
  height: "100%",
  margin: 0,
  padding: 30,
  justifyContent: "flex-start",
  //   alignItems: "center",
  backgroundImage: `url(${background})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover"
};

export const avatar = {
  display: "flex",
  marginLeft: "auto",
  marginRight: "auto",
  width: 80,
  height: 80
};

export const row = {
  display: "flex",
  flexDirection: "row"
};

export const icon = {
  marginLeft: 10
};

export const Form = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center"
};

export const text = {
  color: "#9D9C9C",
  margin: 15
};

export const input = {
  minWidth: 250,
  width: "30%",
  textAlign: "center",
  margin: 20
};

export const button = {
  width: 150,
  backgroundColor: "#ef4023",
  borderRadius: "2em",
  marginTop: "1.3em",
  padding: "0.8em"
};
