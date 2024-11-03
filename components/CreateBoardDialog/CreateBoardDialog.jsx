import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import CustomTextField from "../CustomTextField/CustomTextField";

const CreateBoardDialog = ({
  open,
  setOpen,
  handleCreateBoard,
  boardNameInput,
  setBoardNameInput,
}) => {
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      PaperProps={{ sx: { bgcolor: "#363e45" } }}
    >
      <DialogTitle color="#cfd3d7">Create New Item</DialogTitle>
      <DialogContent>
        <DialogContentText marginBottom={2} color="#cfd3d7">
          Enter the name of the board you have to create
        </DialogContentText>
        <CustomTextField
          id="outlined-basic"
          label="board name"
          variant="outlined"
          onChange={(e) => setBoardNameInput(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleCreateBoard} color="primary">
          Create
        </Button>
        <Button
          variant="contained"
          onClick={() => setOpen(false)}
          color="primary"
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateBoardDialog;
