import React from "react";

import {
  Typography,
  Box,
  TextField,
  Select,
  MenuItem,
  Button,
  Paper,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { User } from "../../shared/contracts/User";

import useDebouncedState from "../../shared/hooks/useDebouncedState";

import UserTable from "./components/UserTable";
import UserDataProvider from "./contexts/UserDataProvider";

function IndexPage() {
  const theme = useTheme();
  const isSmallDevice = useMediaQuery(theme.breakpoints.up("sm"));

  const [keyword, setKeyword, debouncedKeyword] = useDebouncedState<string>(
    "",
    300
  );
  const [gender, setGender, debouncedGender] = useDebouncedState<
    User["gender"] | ""
  >("", 300);

  const handleResetFilter = () => {
    setKeyword("");
    setGender("");
  };

  return (
    <>
      <Box margin={2}>
        <Typography variant="h4">Fake User Data Table</Typography>
        <Typography>
          A simple app to display user list created using Next.js and
          randomuser.me API
        </Typography>
        <Paper variant="outlined" sx={{ padding: 2, marginTop: 2 }}>
          <Typography>FILTER DATA</Typography>
          <Box
            sx={{
              marginTop: 1,
              display: "grid",
              gap: 1,
              gridTemplateColumns: isSmallDevice
                ? "1fr 150px 150px"
                : undefined,
            }}
          >
            <TextField
              placeholder="Search keyword"
              variant="outlined"
              size="small"
              value={keyword}
              onChange={(evt) => {
                setKeyword(evt.target.value);
              }}
            />
            <Select
              size="small"
              displayEmpty
              value={gender}
              onChange={(evt) => {
                setGender(evt.target.value as User["gender"] | "");
              }}
            >
              <MenuItem value="">
                <em>All Gender</em>
              </MenuItem>
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </Select>
            <Button variant="contained" onClick={handleResetFilter}>
              Reset Filter
            </Button>
          </Box>
        </Paper>
      </Box>
      <UserDataProvider keyword={debouncedKeyword} gender={debouncedGender}>
        <UserTable />
      </UserDataProvider>
    </>
  );
}

export default IndexPage;
