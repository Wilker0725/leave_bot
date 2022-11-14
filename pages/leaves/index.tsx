import LeavesList from "@/features/leaves/LeavesList";
import { IconButton, Stack } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import { FormEvent, useState } from "react";
import Container from "@mui/material/Container";
import { GridSearchIcon } from "@mui/x-data-grid";
import { useAppDispatch } from "@/app/store";
import {
  setLeavePageQuery,
  setLeaveSearch,
  resetQuery,
  setLeavePage,
  setIsSearch,
  selectLeaveIsSearch,
} from "@/features/leaves/leaveSlice";
import { objectToQuery } from "@/utils/queryTransform";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import SearchLeave from "@/features/leaves/SearchLeave";
import { useSelector } from "react-redux";
import dayjs, { Dayjs } from "dayjs";
import { FormDataLeave } from "@/features/leaves/types";

const Leave = () => {
  const dispatch = useAppDispatch();
  const isSearch = useSelector(selectLeaveIsSearch);
  const [formData, setFormData] = useState<Partial<FormDataLeave>>({});
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const handleSearchInput = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const name = event.target.name;
    setFormData({ ...formData, [name]: event.target.value.trim() });
  };

  const handleOnSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const leaveQuery = objectToQuery(formData);

    dispatch(setLeaveSearch(leaveQuery));
    dispatch(setLeavePage(0));
    dispatch(setLeavePageQuery(`page=1&limit=10&${leaveQuery}`));

    dispatch(setIsSearch(true));

    // reset state
    setIsSearchOpen(false);
    setFormData({});
  };

  const onChangeDate = (newValue: Dayjs | null, name: string) => {
    setFormData({ ...formData, [name]: dayjs(newValue).toISOString() });
  };

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setIsSearchOpen(open);
    };
  return (
    <Container>
      <Stack direction={"column"}>
        <Stack direction={"row"} ml={"auto"} my={2}>
          <IconButton color={"info"} onClick={toggleDrawer(true)}>
            <GridSearchIcon />
          </IconButton>
          {isSearch ? (
            <IconButton
              color={"info"}
              style={{ paddingLeft: 0 }}
              onClick={() => {
                dispatch(resetQuery({}));
              }}
            >
              <RestartAltIcon />
            </IconButton>
          ) : null}
        </Stack>
        <Drawer
          anchor={"top"}
          open={isSearchOpen}
          onClose={toggleDrawer(false)}
        >
          <SearchLeave
            formData={formData}
            onChangeDate={onChangeDate}
            onChangeText={handleSearchInput}
            onSubmit={handleOnSubmit}
          />
        </Drawer>
        <LeavesList />
      </Stack>
    </Container>
  );
};

export default Leave;
