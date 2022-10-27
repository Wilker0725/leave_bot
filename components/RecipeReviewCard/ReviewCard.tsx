import React, { HTMLProps, LegacyRef } from "react"
import { LinkProps } from "next/link"
import { styled } from "@mui/material/styles"
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
      <Box>
        <a ref={ref} href={href}>
          <Card sx={{ width: "100%" }}>
            <Box ml={2}>{children}</Box>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {message}
              </Typography>
            </CardContent>
          </Card>
        </a>
      </Box>
    )
  }
)

RecipeReviewCard.displayName = "RecipeReviewCard"

export default RecipeReviewCard
