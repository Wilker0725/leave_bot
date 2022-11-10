import NextLink from "next/link";
import UsersList from "@/features/users/UsersList";
import LeavesList from "@/features/leaves/leavesList";
import { IconButton, SelectChangeEvent, Stack } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import Link from "@mui/material/Link";
import { useState } from "react";
import Container from "@mui/material/Container";
import { GridSearchIcon } from "@mui/x-data-grid";
import { useAppDispatch } from "@/app/store";
import {
  setUserPageQuery,
  setUserSearch,
  resetQuery,
  setUserPage,
} from "@/features/users/userSlice";
import { objectToQuery } from "@/utils/queryTransform";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import SearchLeave from "@/features/leaves/SearchLeave";
import { useSelector } from "react-redux";

type typeFormData = {
  employeeName?: string;
  employeeId?: string;
  projectName?: string;
  leaveType?: string;
  startDate?: string;
  endDate?: string;
};

const Leaves = () => {
  const dispatch = useAppDispatch();
  //   const isSearch = useSelector(selectUserIsSearch);
  const [formData, setFormData] = useState<typeFormData | object>({});
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const handleSearchInput = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const name = event.target.name;
    setFormData({ ...formData, [name]: event.target.value.trim() });
  };
  const handleOnSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userQuery = objectToQuery(formData);
    dispatch(setUserSearch(userQuery));
    dispatch(setUserPage(0));
    dispatch(setUserPageQuery(`page=1&limit=10&${userQuery}`));
    dispatch(setUserSearch(true));
    // reset state
    setIsSearchOpen(false);
    setFormData({});
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
          {/* {isSearch ? (
            <IconButton
              color={"info"}
              style={{ paddingLeft: 0 }}
              onClick={() => {
                dispatch(resetQuery({}));
              }}
            >
              <RestartAltIcon />
            </IconButton>
          ) : null} */}
        </Stack>
        <Drawer
          anchor={"top"}
          open={isSearchOpen}
          onClose={toggleDrawer(false)}
        >
          <SearchLeave
            formData={formData}
            onChangeText={handleSearchInput}
            onSubmit={handleOnSubmit}
          />
        </Drawer>
        <LeavesList />
      </Stack>
    </Container>
  );
};

export default Leaves;
