import FormGroup from "@mui/material/FormGroup"
import TextField from "@mui/material/TextField"
import Autocomplete from "@mui/material/Autocomplete"
import MenuItem from "@mui/material/MenuItem"

type TypeInputVaraint = "outlined" | "filled" | "standard"

type TypeInputBase = {
  id: string
  label: string
  variant: TypeInputVaraint
}

interface TypeTextInput extends TypeInputBase {
  onChangeText: (
    value: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
}

interface TypeSelectInput extends Omit<TypeInputBase, "variant"> {
  required: boolean
}

export const TextInput = ({
  onChangeText,
  id,
  label,
  variant,
}: TypeTextInput) => {
  return (
    <TextField
      id="cognizant_username"
      fullWidth
      label="User Name"
      variant="outlined"
      onChange={onChangeText}
    />
  )
}

export const SelectInput = ({ id, name, label, required, options }) => {
  return (
    <TextField id="is_active" select required={true} label="Active">
      <MenuItem>{options.value}</MenuItem>
    </TextField>
  )
}
