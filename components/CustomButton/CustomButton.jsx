import React from "react";
import { Button } from "@mui/material";

const customButtonStyle = {
  color: "#cfd3d7",
  borderColor: "#cfd3d7",
  backgroundColor: "#364454",
  textTransform: "none",
  "&:hover": {
    color: "#ffffff",
    borderColor: "#cfd3d7",
    backgroundColor: "#2b3a4a",
  },
};

const CustomButton = ({ label, onClick }) => {
  return (
    <Button onClick={onClick} color="primary" sx={customButtonStyle}>
      {label}
    </Button>
  );
};

export default CustomButton;
