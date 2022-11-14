import Search from "@/components/Search";
import { Button, Grid, SelectChangeEvent, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { GridSearchIcon } from "@mui/x-data-grid";
import { FormDataLeave } from "./types";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

import React, { useEffect, useRef } from "react";
import { Dayjs } from "dayjs";

type typeSearchLeave = {
  onChangeText: (
    event:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent
  ) => void;
  onChangeDate: (newValue: Dayjs | Date, name: string) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  formData: Partial<FormDataLeave>;
};

const SearchLeave = ({
  onChangeText,
  onChangeDate,
  onSubmit,
  formData,
}: typeSearchLeave) => {
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
      <Grid item xs={6} md={4}>
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
      {/* 
        Server expected: 10-11-2022
        Client sent: 2022-11-18T00%253A00%253A00%252B08%253A00
      */}

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Grid item xs={6} md={4}>
          <DesktopDatePicker
            label="Start Date"
            inputFormat="YYYY/MM/DD"
            value={formData.start_date || null}
            onChange={(value: Dayjs | Date) =>
              onChangeDate(value, "start_date")
            }
            renderInput={(params) => <TextField {...params} fullWidth />}
          />
        </Grid>
        <Grid item xs={6} md={4}>
          <DesktopDatePicker
            label="End Date"
            inputFormat="YYYY/MM/DD"
            value={formData.end_date || null}
            onChange={(value: Dayjs | Date) => onChangeDate(value, "end_date")}
            renderInput={(params) => <TextField {...params} fullWidth />}
          />
        </Grid>
      </LocalizationProvider>
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
