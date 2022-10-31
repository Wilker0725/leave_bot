import Breadcrumbs from "@mui/material/Breadcrumbs"
import Link from "@mui/material/Link"
import Typography from "@mui/material/Typography"
import { Container } from "@mui/system"
import NextLink from "next/link"
import { useRouter } from "next/router"

const BreadcrumbsNav = () => {
  const router = useRouter()

  function generateBreadcrumbs() {
    const asPathWithoutQuery = router.asPath.split("?")[0]

    const asPathNestedRoutes = asPathWithoutQuery
      .split("/")
      .filter((v) => v.length > 0)

    const crumblist = asPathNestedRoutes.map((subpath, idx) => {
      const href = "/" + asPathNestedRoutes.slice(0, idx + 1).join("/")
      // The title will just be the route string for now
      const title = subpath
      return { href, text: title }
    })

    // Add in a default "Home" crumb for the top-level
    return [{ href: "/", text: "Home" }, ...crumblist]
  }

  // Call the function to generate the breadcrumbs list
  const breadcrumbs = generateBreadcrumbs()

  return (
    <Container>
      <Breadcrumbs aria-label="breadcrumb">
        {breadcrumbs.map((crumb, idx) => (
          <Crumb {...crumb} key={idx} last={idx === breadcrumbs.length - 1} />
        ))}
      </Breadcrumbs>
    </Container>
  )
}

function Crumb({ text, href, last = false }) {
  if (last) {
    return <Typography color="text.primary">{text}</Typography>
  }

  return (
    <Link underline="hover" color="inherit" href={href}>
      {text}
    </Link>
  )
}

export default BreadcrumbsNav
