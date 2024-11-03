import React, { useState, useRef, useEffect } from "react";
import { Box, Card, Typography, Button } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

const cardStyle = {
  backgroundColor: "#1e2222",
  color: "#cfd3d7",
  padding: 1,
  fontSize: "1rem",
};

const AddAnotherCard = ({ setCardNameInput, createCard }) => {
  let [isInputCardOpen, setIsInputCardOpen] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isInputCardOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isInputCardOpen]);

  return (
    <>
      {isInputCardOpen ? (
        <>
          <Card className="card" sx={cardStyle} key={"new-card"}>
            <input
              ref={inputRef}
              className="card-input"
              type="text"
              placeholder="Enter card name"
              onChange={(e) => setCardNameInput(e.target.value)}
            />
          </Card>
          <Box display={"flex"} alignItems={"center"} gap={2}>
            <Button
              onClick={() => {
                createCard();
                setIsInputCardOpen(false);
              }}
              variant="contained"
              size="small"
            >
              Add card
            </Button>
            <ClearIcon onClick={() => setIsInputCardOpen(false)} />
          </Box>
        </>
      ) : (
        <Typography
          onClick={() => setIsInputCardOpen(true)}
          fontSize={"1rem"}
          marginTop={1}
          sx={{ cursor: "pointer" }}
        >
          + Add a card
        </Typography>
      )}
    </>
  );
};

export default AddAnotherCard;
