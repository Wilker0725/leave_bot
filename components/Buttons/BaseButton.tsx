import { useState } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const BaseButton = ({ handleOpen }) => {
  return (
    <Stack spacing={2} direction="row" justifyContent="end" margin="40px 25px">
      <Button variant="contained" onClick={handleOpen}>
        Add New Employee
        <AddCircleOutlineIcon />
      </Button>
    </Stack>
  );
};

export default BaseButton;
