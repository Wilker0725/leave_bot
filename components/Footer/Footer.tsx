import Container from "@mui/material/Container";
import { Box } from "@mui/system";

const Footer = () => {
  return (
    <Box mt={"auto"}>
      <Box
        sx={{
          backgroundColor: "#1976d2",
          p: 2,
          color: "#fff",
          fontSize: "14px",
          mt: 4,
        }}
      >
        Government Technology Agency (GovTech)
      </Box>
    </Box>
  );
};

export default Footer;
