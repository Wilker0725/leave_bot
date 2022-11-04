import { useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Stack } from "@mui/system";

const style = {
  position: "absolute" as "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  textAlign: "center",
};

type PropsConfirmation = {
  text: string;
  children: JSX.Element;
  onClickYes: () => any;
};

const Confirmation = ({ text, onClickYes, children }: PropsConfirmation) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Box onClick={handleOpen}>{children}</Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {text}
          </Typography>
          <Stack
            direction={"row"}
            alignItems="center"
            justifyContent={"center"}
            mt={4}
            spacing={2}
          >
            <Button variant="outlined" onClick={onClickYes} color="error">
              Yes
            </Button>
            <Button variant="outlined" onClick={handleClose} color="info">
              No
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
};

export default Confirmation;
