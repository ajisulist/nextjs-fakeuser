import React from "react";
import format from "date-fns/format";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
  TableBody,
  TablePagination,
  Skeleton,
  Typography,
} from "@mui/material";
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
        if (prev.sortOrder === "ascend") {
          return {
            ...prev,
            sortOrder: "descend",
          };
        }
        return {
          ...prev,
          sortBy: "",
          sortOrder: "",
        };
      }
      return {
        ...prev,
        sortBy: column,
        sortOrder: "ascend",
      };
    });
  };

  let tableContent = null;

  if (data.status === "LOADING") {
    tableContent = new Array(tableMeta.results).fill(null).map((_, idx) => {
      return (
        <TableRow key={idx} id="tableBody">
          <TableCell>
            <Skeleton animation="wave" height={20} width={90} />
          </TableCell>
          <TableCell>
            <Skeleton animation="wave" height={20} width={250} />
          </TableCell>
          <TableCell>
            <Skeleton animation="wave" height={20} width={250} />
          </TableCell>
          <TableCell>
            <Skeleton animation="wave" height={20} width={100} />
          </TableCell>
          <TableCell>
            <Skeleton animation="wave" height={20} />
          </TableCell>
        </TableRow>
      );
    });
  }
  if (data.status === "ERROR") {
    tableContent = (
      <>
        <TableRow>
          <TableCell colSpan={5} align="center">
            <Typography variant="h6" component="div" mt={10}>
              Failed to load user data
            </Typography>
            <Typography variant="subtitle2" component="div" mb={10}>
              Please check your internet connection and try again.
            </Typography>
          </TableCell>
        </TableRow>
      </>
    );
  }

  if (data.status === "SUCCESS") {
    tableContent = data.users.map((el) => {
      const fullName = `${el.name.title} ${el.name.first} ${el.name.last}`;
      return (
        <TableRow key={el.login.username}>
          <TableCell>{el.login.username}</TableCell>
          <TableCell>{fullName}</TableCell>
          <TableCell>{el.email}</TableCell>
          <TableCell>{el.gender.toUpperCase()}</TableCell>
          <TableCell>
            {format(new Date(el.registered.date), "dd MMM yyyy")}
          </TableCell>
        </TableRow>
      );
    });
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
                Registeration Date
              </TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{tableContent}</TableBody>
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
