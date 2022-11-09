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
import { ProjectSearchFormData } from "./types";

type SearchProjectProp = {
  onChangeText: (
    event:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent
  ) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  formData: Partial<ProjectSearchFormData>;
};

const SearchProject = ({
  onChangeText,
  onSubmit,
  formData,
}: SearchProjectProp) => {
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
          id="project_name"
          fullWidth
          name="project_name"
          label="Project Name"
          variant="outlined"
          onChange={onChangeText}
          autoFocus={true}
          inputRef={inputRef}
        />
      </Grid>
      <Grid item xs={6} md={4}>
        <TextField
          id="emp_id"
          fullWidth
          name="emp_id"
          label="Employee Id"
          variant="outlined"
          onChange={onChangeText}
        />
      </Grid>
      <Grid item xs={6} md={4}>
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
                label: "Alphabetically, A-Z - Project Name",
                value: "&sort_by=project_name&direction=asc",
              },
              {
                id: 2,
                label: "Alphabetically, Z-A - Project Name",
                value: "&sort_by=project_name&direction=desc",
              },
              {
                id: 3,
                label: "Alphabetically, A-Z - Employee Name",
                value: "&sort_by=emp_name&direction=asc",
              },
              {
                id: 3,
                label: "Alphabetically, Z-A - Employee Name",
                value: "&sort_by=emp_name&direction=desc",
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
      <Grid item xs={6} md={4}>
        <TextField
          fullWidth
          id="po_number"
          name="po_number"
          label="Purchase Order Number"
          variant="outlined"
          onChange={onChangeText}
        />
      </Grid>
      <Grid item xs={6} md={4}>
        <TextField
          fullWidth
          id="so_number"
          name="so_number"
          label="Sales Order Number"
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

export default SearchProject;
