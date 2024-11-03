import React from "react";
import { TextField } from "@mui/material";

const sx = {
  "& .MuiInput-underline:before": {
    borderBottomColor: "#cfd3d7",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#cfd3d7",
  },
  "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
    borderBottomColor: "#cfd3d7",
  },
};

const InputProps = {
  style: {
    color: "#cfd3d7",
    borderBottom: "1px solid #cfd3d7",
  },
  disableUnderline: false,
};

const InputLabelProps = {
  style: { color: "#cfd3d7" },
};

const CustomTextField = ({ onChange }) => {
  return (
    <TextField
      onChange={onChange}
      id="standard-basic"
      label="title"
      variant="standard"
      InputLabelProps={InputLabelProps}
      InputProps={InputProps}
      sx={sx}
    />
  );
};

export default CustomTextField;
