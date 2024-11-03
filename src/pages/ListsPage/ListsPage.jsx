import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import List from "../../components/List/List";
import axios from "axios";
import AddAnotherList from "../../components/AddAnotherList/AddAnotherList";
import { apiKey, token, baseURL } from "../../apiConfig/apiConfig";
import { useSnackbar } from "notistack";

const ListsPage = () => {
  let { boardId } = useParams();
  const [lists, setLists] = useState([]);
  const [listNameInput, setListNameInput] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const createList = async () => {
    if (listNameInput) {
      try {
        const res = await axios.post(
          `${baseURL}/lists?name=${listNameInput}&idBoard=${boardId}&key=${apiKey}&token=${token}`
        );
        setLists([...lists, { id: res.data.id, name: res.data.name }]);
      } catch (error) {
        
        enqueueSnackbar(`Failed to create list: ${error.message}`, {
          variant: "error",
        });
      }
    }
  };

  const fetchLists = async () => {
    try {
      const res = await axios.get(
        `${baseURL}/boards/${boardId}/lists?key=${apiKey}&token=${token}&fields=id,name`
      );
      setLists(res.data);
    } catch (error) {
      
      enqueueSnackbar(`Failed to load lists: ${error.message}`, {
        variant: "error",
      });
    }
  };

  const archiveList = async (listId) => {
    try {
      const res = await axios.put(
        `${baseURL}/lists/${listId}/closed?value=true&key=${apiKey}&token=${token}`
      );
      if (res.status == 200) {
        setLists(lists.filter((list) => list.id != listId));
      }
    } catch (error) {
      
      enqueueSnackbar(`Failed to archive list: ${error.message}`, {
        variant: "error",
      });
    }
  };

  useEffect(() => {
    fetchLists();
  }, []);

  return (
    <Box
      sx={{
        marginTop: 6,
        overflowX: "auto",
        whiteSpace: "nowrap",
        width: "100%",
        height: "85vh",
      }}
    >
      {lists.length > 0 ? (
        lists.map((list) => (
          <List key={list.id} list={list} archiveList={archiveList} />
        ))
      ) : (
        <p>No lists available.</p>
      )}

      <AddAnotherList
        setListNameInput={setListNameInput}
        createList={createList}
      />
    </Box>
  );
};

export default ListsPage;
