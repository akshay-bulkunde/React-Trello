import React from "react";
import { Box, Checkbox, FormControlLabel, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

let checkItemBoxStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  "&:hover .delete-button": {
    visibility: "visible",
  },
};

const CheckItem = ({ item, updateCheckItem, deleteCheckItem }) => {
  return (
    <Box sx={checkItemBoxStyle}>
      <FormControlLabel
        key={item.id}
        control={
          <Checkbox
            checked={item.state === "complete"}
            sx={{ color: "#cfd3d7" }}
            onChange={() => updateCheckItem(item.id)}
          />
        }
        label={item.name}
        sx={{ color: "#cfd3d7" }}
      />
      <IconButton
        aria-label="delete"
        onClick={() => deleteCheckItem(item.id)}
        className="delete-button"
        sx={{
          visibility: "hidden",
          color: "#cfd3d7",
        }}
      >
        <DeleteIcon />
      </IconButton>
    </Box>
  );
};

export default CheckItem;
