import React, { useEffect, useState } from "react";
import axios from "axios";
import Board from "../../components/Board/Board";
import CreateBoardDialog from "../../components/CreateBoardDialog/CreateBoardDialog";
import {
  Typography,
  Container,
  Box,
  Button,
  CircularProgress,
} from "@mui/material";
import { apiKey, token, baseURL } from "../../apiConfig/apiConfig";
import { useSnackbar } from "notistack";

const Home = () => {
  const [openBoards, setOpenBoards] = useState([]);
  const [boardNameInput, setBoardNameInput] = useState("");

  const [open, setOpen] = useState(false);
  const [loader, setLoader] = useState(true);
  const { enqueueSnackbar } = useSnackbar();

  const getOpenBoards = async () => {
    try {
      const response = await axios.get(
        `${baseURL}/members/me/boards?key=${apiKey}&token=${token}&filter=open`
      );
      console.log(response.data);
      setOpenBoards(response.data);
    } catch (error) {
      console.error(error);
      enqueueSnackbar(`Failed to load boards: ${error.message}`, {
        variant: "error",
      });
    } finally {
      setLoader(false);
    }
  };

  const createBoard = async () => {
    console.log(boardNameInput);
    try {
      const res = await axios.post(
        `${baseURL}/boards/?name=${boardNameInput}&key=${apiKey}&token=${token}`
      );
      setOpenBoards([...openBoards, res.data]);
    } catch (error) {
      console.error(error);
      enqueueSnackbar(`Failed to create board: ${error.message}`, {
        variant: "error",
      });
    }
  };

  const handleCreateBoard = async () => {
    setOpen(false);
    createBoard();
  };

  useEffect(() => {
    getOpenBoards();
  }, []);

  return (
    <Container>
      <Button
        variant="contained"
        sx={{ marginTop: "3rem" }}
        onClick={() => setOpen(true)}
      >
        Create
      </Button>

      <CreateBoardDialog
        open={open}
        setOpen={setOpen}
        handleCreateBoard={handleCreateBoard}
        boardNameInput={boardNameInput}
        setBoardNameInput={setBoardNameInput}
      />

      <Box marginTop="3rem">
        <Typography color="#ffffff" variant="h5">
          Your Workspace Boards
        </Typography>
        {loader ? (
          <Box display="flex" justifyContent={"center"}>
            <CircularProgress></CircularProgress>
          </Box>
        ) : (
          <Box display="flex" flexWrap="wrap">
            {openBoards.map((board) => (
              <Board key={board.id} board={board}></Board>
            ))}
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default Home;
