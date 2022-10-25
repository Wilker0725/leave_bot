import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Container from "@mui/material/Container"
import Box from "@mui/material/Box"

type PropsLayout = {
  children: JSX.Element
}

const Layout = ({ children }: PropsLayout) => {
  return (
    <Box minHeight={"100vh"} display="flex" flexDirection={"column"}>
      <Header />
      <Box sx={{ flexGrow: 1 }}>
        <Container>{children}</Container>
      </Box>
      <Footer />
    </Box>
  )
}

export default Layout
