import React from "react"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Box from "@mui/system/Box"
import Typography from "@mui/material/Typography"

type PropsRecipeReviewCard = {
  message: string
  href?: string
  children: JSX.Element
}

const RecipeReviewCard = React.forwardRef<any, PropsRecipeReviewCard>(
  ({ message, children, href }, ref) => {
    return (
      <Box display={"flex"} flexDirection="column" justifyContent={"center"}>
        <a ref={ref} href={href}>
          <Card sx={{ width: "100%" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "300px",
              }}
            >
              <Box ml={2}>{children}</Box>
              <CardContent>
                <Typography variant="h5" color="text.secondary">
                  {message}
                </Typography>
              </CardContent>
            </div>
          </Card>
        </a>
      </Box>
    )
  }
)

RecipeReviewCard.displayName = "RecipeReviewCard"

export default RecipeReviewCard
