import * as React from "react"
import TextField from "@mui/material/TextField"
import Grid from "@mui/material/Grid"
import Autocomplete from "@mui/material/Autocomplete"
import { Box, Button, Paper, Typography } from "@mui/material"
import { GridSearchIcon } from "@mui/x-data-grid"

type PropsSearch = {
  onChangeText?: (
    value: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
  autoCompleteOnChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue: string
  ) => void
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

const Search = ({
  onChangeText,
  autoCompleteOnChange,
  onSubmit,
}: PropsSearch) => {
  return (
    <Box mb={2} component="form" onSubmit={onSubmit}>
      <Paper variant="outlined">
        <Grid container spacing={2} py={4} px={2}>
          <Grid item xs={12}>
            <Typography variant="h6" fontWeight={600}>
              Search:
            </Typography>
          </Grid>
          <Grid item xs={6} md={4}>
            <TextField
              id="cognizant_username"
              fullWidth
              name="User Name"
              label="User Name"
              variant="outlined"
              onChange={onChangeText}
            />
          </Grid>
          <Grid item xs={6} md={4}>
            <TextField
              id="cognizant_user_id"
              fullWidth
              name="User Id"
              label="User Id"
              variant="outlined"
              onChange={onChangeText}
            />
          </Grid>
          <Grid item xs={6} md={4}>
            <TextField
              fullWidth
              id="team_name"
              name="Team Name"
              label="Team Name"
              variant="outlined"
              onChange={onChangeText}
            />
          </Grid>
          <Grid item md={12} ml={"auto"}>
            <Box display={"flex"}>
              <Box ml="auto">
                <Button
                  type="submit"
                  variant="contained"
                  endIcon={<GridSearchIcon />}
                >
                  Search
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  )
}

type PropsProjectData = {
  project: string
  inCharge: {
    id: number
    name: string
    role: string | []
  }
}

const ProjectData: readonly PropsProjectData[] = [
  { project: "BookingSG", inCharge: { id: 2, name: "John", role: "Manager" } },
  { project: "FilterSG", inCharge: { id: 10, name: "Bob", role: "Admin" } },
  { project: "HotelSG", inCharge: { id: 7, name: "Weyne", role: "Employee" } },
]
export default Search
