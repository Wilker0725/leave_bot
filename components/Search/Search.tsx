import * as React from "react";
import Grid from "@mui/material/Grid";
import { Box, Paper, Typography } from "@mui/material";

type PropsSearch = {
  onChangeText?: (
    value: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  autoCompleteOnChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue: string
  ) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
};

const Search = ({ onSubmit, children }: PropsSearch) => {
  return (
    <Box component="form" onSubmit={onSubmit}>
      <Paper variant="outlined">
        <Grid container spacing={2} py={4} px={2}>
          <Grid item xs={12}>
            <Typography variant="h6" fontWeight={600}>
              Search:
            </Typography>
          </Grid>
          {children}
        </Grid>
      </Paper>
    </Box>
  );
};

export default Search;
