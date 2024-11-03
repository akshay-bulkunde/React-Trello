import React, { useState } from "react";
import { Box, Card, Typography, Button } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

const listStyle = {
  backgroundColor: "#1e2222",
  color: "#cfd3d7",
  padding: 1,
  marginY: 1,
  fontSize: "1rem",
};

const AddAnotherList = ({ setListNameInput, createList }) => {
  let [isInputListOpen, setIsInputListOpen] = useState(false);

  return (
    <Box className="list-container-box" key={"new-list"}>
      {isInputListOpen ? (
        <>
          <Card className="card" sx={listStyle} key={"new-card"}>
            <input
              className="list-input"
              type="text"
              placeholder="Enter list name"
              onChange={(e) => setListNameInput(e.target.value)}
            />
          </Card>
          <Box display={"flex"} alignItems={"center"} gap={2}>
            <Button
              onClick={() => {
                createList();
                setIsInputListOpen(false);
              }}
              variant="contained"
              size="small"
            >
              Add List
            </Button>
            <ClearIcon onClick={() => setIsInputListOpen(false)} />
          </Box>
        </>
      ) : (
        <Typography fontSize={"1rem"} onClick={() => setIsInputListOpen(true)}>
          + Add another list
        </Typography>
      )}
    </Box>
  );
};

export default AddAnotherList;
