import Search from "@/components/Search";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import { GridSearchIcon } from "@mui/x-data-grid";
import React, { useEffect, useRef } from "react";
import { UserSearchFormData } from "./types";

type SearchUserProp = {
  onChangeText: (
    event:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent
  ) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  formData: Partial<UserSearchFormData>;
};

const SearchUser = ({ onChangeText, onSubmit, formData }: SearchUserProp) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      inputRef.current.focus();
    }, 100);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <Search onSubmit={onSubmit}>
      <Grid item xs={6} md={3}>
        <TextField
          id="cognizant_username"
          fullWidth
          name="cognizant_username"
          label="Name"
          variant="outlined"
          onChange={onChangeText}
          autoFocus={true}
          inputRef={inputRef}
        />
      </Grid>
      <Grid item xs={6} md={3}>
        <TextField
          id="cognizant_user_id"
          fullWidth
          name="cognizant_user_id"
          label="Employee Id"
          variant="outlined"
          onChange={onChangeText}
        />
      </Grid>
      <Grid item xs={6} md={3}>
        <TextField
          fullWidth
          id="team_name"
          name="team_name"
          label="Team Name"
          variant="outlined"
          onChange={onChangeText}
        />
      </Grid>
      <Grid item xs={6} md={3}>
        <FormControl fullWidth>
          <InputLabel id="sort_by">Sort By</InputLabel>
          <Select
            labelId="sort_by"
            id="sort_by"
            name="sort_by"
            label="Sort By"
            variant="outlined"
            onChange={onChangeText}
            value={formData?.sort_by || ""}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {[
              {
                id: 1,
                label: "Alphabetically, A-Z - Team Name",
                value: "&sort_by=team_name&direction=asc",
              },
              {
                id: 2,
                label: "Alphabetically, Z-A - Team Name",
                value: "&sort_by=team_name&direction=desc",
              },
              {
                id: 3,
                label: "Alphabetically, A-Z - Cognizant Username",
                value: "&sort_by=cognizant_username&direction=asc",
              },
              {
                id: 3,
                label: "Alphabetically, Z-A - Cognizant Username",
                value: "&sort_by=cognizant_username&direction=desc",
              },
              {
                id: 5,
                label: "Date, new to old",
                value: "&sort_by=created_at&direction=desc",
              },
              {
                id: 6,
                label: "Date, old to new",
                value: "&sort_by=created_at&direction=asc",
              },
            ].map((item) => (
              <MenuItem key={item.value} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
