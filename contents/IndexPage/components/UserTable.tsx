import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
  TableBody,
  TablePagination,
} from "@mui/material";
import React from "react";
import {
  UserTableMetaState,
  useUserDataState,
  useUserTableMeta,
} from "../contexts/UserDataProvider";

const UserTable = () => {
  const data = useUserDataState();
  const [tableMeta, setTableMeta] = useUserTableMeta();

  const handleToggleSort = (column: string) => () => {
    setTableMeta((prev) => {
      if (column === prev.sortBy) {
        return {
          ...prev,
          sortOrder: prev.sortOrder === "ascend" ? "descend" : "ascend",
        };
      }
      return {
        ...prev,
        sortBy: column,
        sortOrder: "ascend",
      };
    });
  };

  if (data.status === "LOADING") {
    <h1>Loading....</h1>;
  }
  if (data.status === "ERROR") {
  }

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <TableSortLabel
                active={tableMeta.sortBy === "username"}
                direction={getDirection(tableMeta.sortOrder)}
                onClick={handleToggleSort("username")}
              >
                Username
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={tableMeta.sortBy === "name"}
                direction={getDirection(tableMeta.sortOrder)}
                onClick={handleToggleSort("name")}
              >
                Name
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={tableMeta.sortBy === "email"}
                direction={getDirection(tableMeta.sortOrder)}
                onClick={handleToggleSort("email")}
              >
                Email
              </TableSortLabel>
            </TableCell>
            <TableCell width="1%">
              <TableSortLabel
                active={tableMeta.sortBy === "gender"}
                direction={getDirection(tableMeta.sortOrder)}
                onClick={handleToggleSort("gender")}
              >
                Gender
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={tableMeta.sortBy === "registerDate"}
                direction={getDirection(tableMeta.sortOrder)}
                onClick={handleToggleSort("registerDate")}
              >
                Register Date
              </TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.users.map((el) => {
            const fullName = `${el.name.title} ${el.name.first} ${el.name.last}`;
            return (
              <TableRow>
                <TableCell>{el.login.username}</TableCell>
                <TableCell>{fullName}</TableCell>
                <TableCell>{el.email}</TableCell>
                <TableCell>{el.gender.toUpperCase()}</TableCell>
                <TableCell>{el.registered.date}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {/* TablePagination using zero-based indexed page, fakeuserapi using one-based indexed page */}
      <TablePagination
        count={-1}
        page={tableMeta.page - 1}
        rowsPerPage={tableMeta.results}
        rowsPerPageOptions={[10, 20, 30]}
        onRowsPerPageChange={(evt) => {
          setTableMeta((prev) => ({
            ...prev,
            results: parseInt(evt.target.value, 10),
          }));
        }}
        onPageChange={(_, page) => {
          setTableMeta((prev) => ({
            ...prev,
            page: page + 1,
          }));
        }}
      />
    </TableContainer>
  );
};

export default UserTable;

// HELPERS
const getDirection = (arg: UserTableMetaState["sortOrder"]) => {
  return arg === "ascend" ? "asc" : "desc";
};
