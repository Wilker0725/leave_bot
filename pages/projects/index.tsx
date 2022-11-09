import NextLink from "next/link";
import ProjectsList from "@/features/projects/ProjectsList";
import { IconButton, SelectChangeEvent, Stack } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import Link from "@mui/material/Link";
import AddIcon from "@mui/icons-material/Add";
import { FormEvent, useState } from "react";
import Container from "@mui/material/Container";
import { GridSearchIcon } from "@mui/x-data-grid";
import { useAppDispatch } from "@/app/store";
import {
  setProjectPageQuery,
  setProjectSearch,
  resetQuery,
  setProjectPage,
  selectProjectIsSearch,
  setIsSearch,
} from "@/features/projects/projectSlice";
import { objectToQuery } from "@/utils/queryTransform";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import SearchProject from "@/features/projects/SearchProject";
import { useSelector } from "react-redux";
import { ProjectSearchFormData } from "@/features/projects/types";

const Project = () => {
  const dispatch = useAppDispatch();
  const isSearch = useSelector(selectProjectIsSearch);

  const [formData, setFormData] = useState<Partial<ProjectSearchFormData>>();
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  const handleSearchInput = (
    event:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent
  ) => {
    const name = event.target.name;

    setFormData({ ...formData, [name]: event.target.value.trim() });
  };

  const handleOnSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const projectQuery = objectToQuery(formData);

    dispatch(setProjectSearch(projectQuery));
    dispatch(setProjectPage(0));
    dispatch(setProjectPageQuery(`page=1&limit=10&${projectQuery}`));

    dispatch(setIsSearch(true));

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
          <NextLink href="/projects/new" passHref>
            <Link>
              <IconButton color={"info"}>
                <AddIcon />
              </IconButton>
            </Link>
          </NextLink>
        </Stack>
        <Drawer
          anchor={"top"}
          open={isSearchOpen}
          onClose={toggleDrawer(false)}
        >
          <SearchProject
            formData={formData}
            onChangeText={handleSearchInput}
            onSubmit={handleOnSubmit}
          />
        </Drawer>
        <ProjectsList />
      </Stack>
    </Container>
  );
};

export default Project;
