import Search from "@/components/Search";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import { GridSearchIcon } from "@mui/x-data-grid";
import { DateRangePicker } from "rsuite";
import React from "react";

const SearchLeaves = ({ onChangeText, onSubmit, formData }) => {
  return (
    <Search onSubmit={onSubmit}>
      <Grid item xs={6} md={3}>
        <TextField
          fullWidth
          id="team_name"
          name="cognizant_user_id"
          label="Project Name"
          variant="outlined"
          onChange={onChangeText}
        />
      </Grid>
      <Grid item xs={6} md={3}>
        <TextField
          id="start-date"
          fullWidth
          name="Start Date"
          label="Start Date"
          variant="outlined"
          type="date"
          onChange={onChangeText}
        />
      </Grid>
      <Grid item xs={6} md={3}>
        <TextField
          id="end_date"
          fullWidth
          name="End Date"
          label="End Date"
          variant="outlined"
          type="date"
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
    </Search>
  );
};

export default SearchLeaves;
