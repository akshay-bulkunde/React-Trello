import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import CustomButton from "../CustomButton/CustomButton";
import axios from "axios";
import CustomTextField from "../CustomTextField/CustomTextField";
import CheckItem from "../CheckItem/CheckItem";
import { apiKey, token, baseURL } from "../../apiConfig/apiConfig";
import { useSnackbar } from "notistack";

const CheckList = ({ checkList, deleteCheckList }) => {
  let [checkItems, setCheckItems] = useState(checkList.checkItems);
  let [addCheckItemView, setAddCheckItemView] = useState(false);
  let [checkItemInput, setCheckItemInput] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  let createCheckItem = async (checkListId) => {
    if (checkItemInput) {
      try {
        let res = await axios.post(
          `${baseURL}/checklists/${checkListId}/checkItems?name=${checkItemInput}&key=${apiKey}&token=${token}`
        );
        setCheckItems([...checkItems, res.data]);
      } catch (error) {
        
        enqueueSnackbar(`Failed to add check item: ${error.message}`, {
          variant: "error",
        });
      } finally {
        setAddCheckItemView(false);
      }
    }
  };

  let updateCheckItem = async (checkItemId) => {
    let newState = null;
    let updatedCheckItems = checkItems.map((item) => {
      if (item.id == checkItemId) {
        if (item.id == checkItemId && item.state == "complete") {
          newState = "incomplete";
        } else if (item.id == checkItemId && item.state == "incomplete") {
          newState = "complete";
        }
        return { ...item, state: newState };
      } else {
        return item;
      }
    });

    try {
      let res = await axios.put(
        `${baseURL}/cards/${checkList.idCard}/checkItem/${checkItemId}?state=${newState}&key=${apiKey}&token=${token}`
      );
      if (res.status == 200) {
        setCheckItems(updatedCheckItems);
      }
    } catch (error) {
      
      enqueueSnackbar(`Failed to update check item: ${error.message}`, {
        variant: "error",
      });
    }
  };

  let deleteCheckItem = async (checkItemId) => {
    try {
      let res = await axios.delete(
        `${baseURL}/cards/${checkList.idCard}/checkItem/${checkItemId}?key=${apiKey}&token=${token}`
      );
      if (res.status == 200) {
        setCheckItems(checkItems.filter((items) => items.id != checkItemId));
      }
    } catch (error) {
     
      enqueueSnackbar(`Failed to delete check item: ${error.message}`, {
        variant: "error",
      });
    }
  };

  return (
    <Box sx={{ mb: 2 }}>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h6" color="#cfd3d7" gutterBottom>
          {checkList.name}
        </Typography>

        <CustomButton
          onClick={() => deleteCheckList(checkList.id)}
          label={"Delete"}
        />
      </Box>
      <Box sx={{ ml: 2 }} display="flex" flexDirection="column">
        {checkItems.map((item) => (
          <CheckItem
            key={item.id}
            item={item}
            updateCheckItem={updateCheckItem}
            deleteCheckItem={deleteCheckItem}
          />
        ))}
        {addCheckItemView ? (
          <Box display="flex" alignItems="center" gap={1}>
            <CustomTextField
              onChange={(e) => setCheckItemInput(e.target.value)}
            />
            <CustomButton
              onClick={() => createCheckItem(checkList.id)}
              label={"Add"}
            />
            <CustomButton
              onClick={() => setAddCheckItemView(false)}
              label={"Cancel"}
            />
          </Box>
        ) : (
          <Box>
            <CustomButton
              onClick={() => setAddCheckItemView(true)}
              label={"Add"}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default CheckList;
