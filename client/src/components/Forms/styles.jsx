import { createTheme } from "@mui/material/styles";

export default createTheme((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(5,5),
    },
  },
  paper: {
    padding: theme.spacing(2),
  },
  form: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  fileInput: {
    width: "97%",
    margin: "50px 0",
  },
  buttonSubmit: {
    marginBottom: 10,
  },
}));
