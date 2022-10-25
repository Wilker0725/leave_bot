import * as React from "react"
import dayjs, { Dayjs } from "dayjs"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker"

type PropsDatePicker = {
  value: Dayjs | null
  label: string
  onChange: (value: Dayjs) => void
}

const DatePicker = ({ value, label, onChange }: PropsDatePicker) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={3}>
        <DesktopDatePicker
          label={label}
          inputFormat="DD/MM/YYYY"
          value={value}
          onChange={onChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </Stack>
    </LocalizationProvider>
  )
}

export default DatePicker
