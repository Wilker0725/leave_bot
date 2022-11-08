import Container from "@mui/material/Container";
import { Box } from "@mui/system";

const Footer = () => {
  return (
    <Box mt={"auto"}>
      <Box
        sx={{
          backgroundColor: "#323232",
          p: 2,
          color: "#b7b7b7",
          fontSize: "12px",
          mt: 4,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontStyle: "normal",
          fontFamily: "Lato,sans-serif",
        }}
      >
        <Box pr={1}>© 2022 Cognizant</Box>
        <Box pl={1}>Government Technology Agency (GovTech)</Box>
      </Box>
    </Box>
  );
};

export default Footer;
