import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import MenuItem from "@mui/material/MenuItem";
import { Grid } from "@mui/material";

type TypeInputVaraint = "outlined" | "filled" | "standard";

export type TypeInputBase = {
  name: string;
  label: string;
  variant?: TypeInputVaraint;
  sizes: { xs: number; md: number };
};

interface TypeTextInput extends TypeInputBase {
  type: "text";
  onChangeText: (
    value: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

export const TextInput = ({
  onChangeText,
  name,
  label,
  variant = "outlined",
  sizes,
}: TypeTextInput) => {
  return (
    <Grid item xs={sizes.xs} md={sizes.md}>
      <FormGroup>
        <TextField
          id={name}
          name={name}
          fullWidth
          label={label}
          placeholder={label}
          variant={variant}
          onChange={onChangeText}
        />
      </FormGroup>
    </Grid>
  );
};

export const SelectInput = ({ name, label, required, options }) => {
  return (
    <TextField id="is_active" select required={true} label="Active">
      <MenuItem>{options.value}</MenuItem>
    </TextField>
  );
};
