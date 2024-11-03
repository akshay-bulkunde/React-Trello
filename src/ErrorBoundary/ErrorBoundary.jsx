import React, { Component } from "react";
import { Typography, Container, Button } from "@mui/material";

const containerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  marginTop: "6rem",
  gap: "1rem",
};

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Container sx={containerStyle}>
          <Typography variant="h2">Oops! Something went wrong.</Typography>
          <Typography variant="h6">
            We're working to fix the problem. Please try again later.
          </Typography>
          <Button onClick={() => window.location.reload()} variant="contained">
            Reload
          </Button>
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
