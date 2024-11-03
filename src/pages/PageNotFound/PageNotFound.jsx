import React from "react";
import { Typography, Container, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const containerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  marginTop: "6rem",
  gap: "1rem",
};

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <Container sx={containerStyle}>
      <Typography variant="h2">Lost Your Way</Typography>
      <Typography variant="h6">
        Sorry, we can't find that page. You'll find lots to explore on the home
        page.
      </Typography>
      <Button onClick={() => navigate("/")} variant="contained">
        Home
      </Button>
    </Container>
  );
};

export default PageNotFound;
