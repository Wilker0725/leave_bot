import Search from "@/components/Search";
import { Button, Grid, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { GridSearchIcon } from "@mui/x-data-grid";
import React from "react";
import Divider from "@mui/material/Divider";

const SearchUser = ({ onChangeText, onSubmit }) => {
  return (
    <Search onSubmit={onSubmit}>
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
    </Search>
  );
};

export default SearchUser;
