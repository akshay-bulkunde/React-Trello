import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";

let boardStyle = {
  backgroundColor: "#0077b6",
  width: "250px",
  height: "150px",
  margin: "10px",
  cursor: "pointer",
  backgroundSize: "cover",
  backgroundPosition: "center",
};

const Board = ({ board }) => {
  return (
    <Link to={`lists/${board.id}`} style={{ textDecoration: "none" }}>
      <Card
        sx={{
          ...boardStyle,
          backgroundImage: `url(${board.prefs.sharedSourceUrl})`,
        }}
        key={board.id}
      >
        <CardContent>
          <Typography variant="h6" color={"#ffffff"}>
            {board.name}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

export default Board;
