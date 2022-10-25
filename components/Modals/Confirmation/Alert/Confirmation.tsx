import { useState } from "react"

import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import Modal from "@mui/material/Modal"

const style = {
  position: "absolute" as "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  textAlign: "center",
}

type PropsConfirmation = {
  text: string
  children: JSX.Element
  onClickYes: () => any
}

const Confirmation = ({ text, onClickYes, children }: PropsConfirmation) => {
  const [open, setOpen] = useState<boolean>(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

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
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {text}
          </Typography>
          <Box display={"flex"} justifyContent="center" mt={4}>
            <Button onClick={onClickYes}>Yes</Button>
            <Button onClick={handleClose}>No</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  )
}

export default Confirmation
