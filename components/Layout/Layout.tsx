import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Box from "@mui/material/Box"
import BreadcrumbsNav from "@/components/Breadcrumbs"

type PropsLayout = {
  children: JSX.Element
}

const Layout = ({ children }: PropsLayout) => {
  return (
    <Box minHeight={"100vh"} display="flex" flexDirection={"column"}>
      <Header />
      <BreadcrumbsNav />
      <Box sx={{ flexGrow: 1 }}>{children}</Box>
      <Footer />
    </Box>
  )
}

export default Layout
