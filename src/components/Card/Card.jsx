import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { Card, CircularProgress } from "@mui/material";
import CustomDialogForCheckLists from "../CustomDialogForCheckLists/CustomDialogForCheckLists";

const cardStyle = {
  backgroundColor: "#1e2222",
  color: "#cfd3d7",
  padding: 1,
  fontSize: "1rem",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderRadius: "10px",
  cursor: "pointer",
};

const CustomCard = ({ card, archiveCard }) => {
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  return (
    <>
      <Card
        className="card"
        onClick={() => setOpenModal(true)}
        sx={cardStyle}
        key={card.id}
      >
        <p>{card.name}</p>
        {loading ? (
          <CircularProgress size={24} style={{ color: "#cfd3d7" }} />
        ) : (
          <DeleteIcon
            onClick={(e) => {
              setLoading(true);
              e.stopPropagation();
              archiveCard(card.id);
            }}
            className="deleteIcon"
          />
        )}
      </Card>
      <CustomDialogForCheckLists
        openModal={openModal}
        setOpenModal={setOpenModal}
        cardId={card.id}
        cardName={card.name}
      />
    </>
  );
};

export default CustomCard;
