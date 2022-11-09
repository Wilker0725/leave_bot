import Search from "@/components/Search";
import { Button, Grid, SelectChangeEvent, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { GridSearchIcon } from "@mui/x-data-grid";
import { typeLeaveFormData } from "./types";
import DateRangePicker from "@/components/DateRangePicker/MuiDateRangePicker";

import React, { useEffect, useRef } from "react";

type typeSearchLeave = {
  onChangeText: (
    event:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent
  ) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  formData: Partial<typeLeaveFormData>;
};

const SearchLeave = ({ onChangeText, onSubmit, formData }: typeSearchLeave) => {
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
          fullWidth
          id="team_name"
          name="team_name"
          label="Project Name"
          variant="outlined"
          onChange={onChangeText}
          autoFocus={true}
          inputRef={inputRef}
        />
      </Grid>
      <Grid item xs={6} md={3}>
        <TextField
          id="start_date"
          fullWidth
          name="start_date"
          variant="outlined"
          type="date"
          onChange={onChangeText}
          autoFocus={true}
          inputRef={inputRef}
        />
      </Grid>
      {/* <Grid item xs={6} md={3}>
        <TextField
          id="end_date"
          fullWidth
          name="end_date"
          variant="outlined"
          type="date"
          onChange={onChangeText}
          autoFocus={true}
          inputRef={inputRef}
        />
      </Grid> */}
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

export default SearchLeave;
