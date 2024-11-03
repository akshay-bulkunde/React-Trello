import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import axios from "axios";
import ArchiveIcon from "@mui/icons-material/Archive";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import AddAnotherCard from "../AddAnotherCard/AddAnotherCard";
import Card from "../Card/Card";
import { apiKey, token, baseURL } from "../../apiConfig/apiConfig";
import { useSnackbar } from "notistack";

const List = ({ list, archiveList }) => {
  let [cards, setCards] = useState([]);
  let [cardNameInput, setCardNameInput] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  let getCards = async () => {
    if (list) {
      try {
        let res = await axios.get(
          `${baseURL}/lists/${list.id}/cards?key=${apiKey}&token=${token}&fields=name,id`
        );
        setCards(res.data);
      } catch (error) {
        console.log(error);
        enqueueSnackbar(`Failed to load cards: ${error.message}`, {
          variant: "error",
        });
      }
    }
  };

  let createCard = async () => {
    if (cardNameInput) {
      try {
        let res = await axios.post(
          `${baseURL}/cards?idList=${list.id}&name=${cardNameInput}&key=${apiKey}&token=${token}&fields=name,id`
        );
        setCards([...cards, { id: res.data.id, name: res.data.name }]);
      } catch (error) {
        console.log(error);
        enqueueSnackbar(`Failed to create card: ${error.message}`, {
          variant: "error",
        });
      }
    }
  };

  let archiveCard = async (cardId) => {
    try {
      let res = await axios.delete(
        `${baseURL}/cards/${cardId}?key=${apiKey}&token=${token}`
      );
      if (res.status) {
        setCards(cards.filter((card) => card.id != cardId));
      }
    } catch (error) {
      console.log(error);
      enqueueSnackbar(`Failed to archive card: ${error.message}`, { variant: "error" });
    }
  };

  useEffect(() => {
    getCards();
  }, []);

  return (
    <>
      <Box className="list-container-box" key={list.id}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography sx={{ cursor: "pointer" }} variant="h6">
            {list.name}
          </Typography>
          <Tooltip title="archive">
            <IconButton
              onClick={() => archiveList(list.id)}
              sx={{ color: "#ffffff" }}
            >
              <ArchiveIcon />
            </IconButton>
          </Tooltip>
        </Box>

        <Box display={"flex"} flexDirection={"column"} gap={1} marginTop={2}>
          {cards.map((card) => (
            <Card key={card.id} card={card} archiveCard={archiveCard} />
          ))}
          <AddAnotherCard
            setCardNameInput={setCardNameInput}
            createCard={createCard}
          />
        </Box>
      </Box>
    </>
  );
};

export default List;
