import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import CustomButton from "../CustomButton/CustomButton";
import CheckList from "../CheckList/CheckList";
import CustomTextField from "../CustomTextField/CustomTextField";
import { apiKey, token, baseURL } from "../../apiConfig/apiConfig";
import { useSnackbar } from "notistack";

const CustomDialog = ({ openModal, setOpenModal, cardId, cardName }) => {
  const [checkLists, setCheckLists] = useState([]);
  const [createCheckListView, setCreateCheckListView] = useState(false);
  const [checkListNameInput, setCheckListNameInput] = useState("");
  const [loader, setLoader] = useState(true);
  const { enqueueSnackbar } = useSnackbar();

  const getCheckLists = async () => {
    if (cardId) {
      try {
        const res = await axios.get(
          `${baseURL}/cards/${cardId}/checklists?key=${apiKey}&token=${token}`
        );
        setCheckLists(res.data);
      } catch (error) {
        
        enqueueSnackbar(`Failed to get checklists: ${error.message}`, {
          variant: "error",
        });
      } finally {
        setLoader(false);
      }
    }
  };

  const createCheckList = async () => {
    if (checkListNameInput) {
      try {
        const res = await axios.post(
          `${baseURL}/cards/${cardId}/checklists?name=${checkListNameInput}&key=${apiKey}&token=${token}`
        );
        
        setCheckLists([...checkLists, res.data]);
      } catch (error) {
        
        enqueueSnackbar(`Failed to create checklist: ${error.message}`, {
          variant: "error",
        });
      } finally {
        setCreateCheckListView(false);
      }
    }
  };

  const deleteCheckList = async (checkListId) => {
    try {
      const res = await axios.delete(
        `${baseURL}/checklists/${checkListId}?key=${apiKey}&token=${token}`
      );
      if (res.status == 200) {
        setCheckLists(
          checkLists.filter((checkList) => checkList.id != checkListId)
        );
      }
    } catch (error) {
     
      enqueueSnackbar(`Failed to delete checklist: ${error.message}`, {
        variant: "error",
      });
    }
  };

  useEffect(() => {
    getCheckLists();
  }, []);

  return (
    <Dialog
      open={openModal}
      onClose={() => setOpenModal(false)}
      aria-labelledby="dialog-title"
      maxWidth="md"
      PaperProps={{
        sx: {
          width: "40%",
          bgcolor: "#363e45",
          p: 2,
        },
      }}
    >
      <DialogTitle color="#cfd3d7" id="dialog-title">
        {cardName}
      </DialogTitle>
      {createCheckListView ? (
        <Box display="flex" alignItems="center" gap={1}>
          <CustomTextField
            onChange={(e) => setCheckListNameInput(e.target.value)}
          />

          <CustomButton onClick={() => createCheckList()} label={"Add"} />
          <CustomButton
            onClick={() => setCreateCheckListView(false)}
            label={"Cancel"}
          />
        </Box>
      ) : (
        <Box>
          <CustomButton
            onClick={() => setCreateCheckListView(true)}
            label={"Create CheckList"}
          />
        </Box>
      )}
      <DialogContent dividers sx={{ marginY: 3 }}>
        {loader ? (
          <Box display="flex" justifyContent={"center"}>
            <CircularProgress></CircularProgress>
          </Box>
        ) : checkLists.length > 0 ? (
          checkLists.map((checkList) => (
            <CheckList
              checkList={checkList}
              deleteCheckList={deleteCheckList}
              key={checkList.id}
            />
          ))
        ) : (
          <Typography variant="body1" color="#cfd3d7">
            No checklists available.
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => setOpenModal(false)}
          color="primary"
          variant="contained"
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomDialog;
