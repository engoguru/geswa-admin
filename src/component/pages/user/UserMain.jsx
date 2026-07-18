import React, { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";

import { alpha } from "@mui/material/styles";
import {
  TextField,
  Box,
  Checkbox,
  FormControlLabel,
  IconButton,
  Paper,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Tooltip,
  Typography,
  Button
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";

import { visuallyHidden } from "@mui/utils";

import { useDispatch, useSelector } from "react-redux";

import MainLayout from "../../layout/MainLayout";
import { allRegisterUser } from "../../../redux/slice/userSlice";
import { Link } from "react-router-dom";


// ====================== SORTING FUNCTIONS ======================

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }

  if (b[orderBy] > a[orderBy]) {
    return 1;
  }

  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}


// ====================== TABLE HEADERS ======================

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Name",
  },
  {
    id: "email",
    numeric: false,
    disablePadding: false,
    label: "Email",
  },
  {
    id: "contact",
    numeric: false,
    disablePadding: false,
    label: "Contact",
  },
  {
    id: "role",
    numeric: false,
    disablePadding: false,
    label: "Role",
  },
  {
    id: "action",
    numeric: false,
    disablePadding: false,
    label: "Action",
  },
];


// ====================== TABLE HEAD ======================

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {/* Checkbox */}
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={
              numSelected > 0 && numSelected < rowCount
            }
            checked={
              rowCount > 0 && numSelected === rowCount
            }
            onChange={onSelectAllClick}
          />
        </TableCell>

        {/* Dynamic Headers */}
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={
              headCell.disablePadding ? "none" : "normal"
            }
            sortDirection={
              orderBy === headCell.id ? order : false
            }
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={
                orderBy === headCell.id ? order : "asc"
              }
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}

              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc"
                    ? "sorted descending"
                    : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};


// ====================== TOOLBAR ======================

function EnhancedTableToolbar(props) {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={[
        {
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
        },

        numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        },
      ]}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          component="div"
        >
          User List
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            {/* <FilterListIcon /> */}
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};


// ====================== MAIN COMPONENT ======================

export default function UserMain() {

  const dispatch = useDispatch();

  const { allUserData, loading } = useSelector(
    (state) => state.user
  );

  // ====================== STATES ======================

  const [order, setOrder] = useState("asc");

  const [orderBy, setOrderBy] = useState("name");

  const [selected, setSelected] = useState([]);

  const [page, setPage] = useState(0);

  const [dense, setDense] = useState(false);

  const [rowsPerPage, setRowsPerPage] = useState(10);


  // ====================== API CALL ======================
  const [search, setSearch] = useState("");
  const [userType, setUserType] = useState("")
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(allRegisterUser({ search, userType }))
    }, 400)
    return () => clearTimeout(timer)
    // dispatch(allRegisterUser());
  }, [search, userType]);


  // ====================== SORT ======================

  const handleRequestSort = (event, property) => {
    const isAsc =
      orderBy === property && order === "asc";

    setOrder(isAsc ? "desc" : "asc");

    setOrderBy(property);
  };


  // ====================== SELECT ALL ======================

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = allUserData?.data?.map(
        (n) => n.id
      );

      setSelected(newSelected);

      return;
    }

    setSelected([]);
  };


  // ====================== SINGLE SELECT ======================

  const handleClick = (event, id) => {

    const selectedIndex = selected.indexOf(id);

    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);

    } else if (selectedIndex === 0) {

      newSelected = newSelected.concat(
        selected.slice(1)
      );

    } else if (
      selectedIndex === selected.length - 1
    ) {

      newSelected = newSelected.concat(
        selected.slice(0, -1)
      );

    } else if (selectedIndex > 0) {

      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };


  // ====================== PAGINATION ======================

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {

    setRowsPerPage(
      parseInt(event.target.value, 10)
    );

    setPage(0);
  };


  // ====================== DENSE ======================

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };


  // ====================== EMPTY ROWS ======================

  const emptyRows =
    page > 0
      ? Math.max(
        0,
        (1 + page) * rowsPerPage -
        (allUserData?.data?.length || 0)
      )
      : 0;


  // ====================== VISIBLE ROWS ======================

  const visibleRows = useMemo(
    () =>
      [...(allUserData?.data || [])]
        .sort(getComparator(order, orderBy))
        .slice(
          page * rowsPerPage,
          page * rowsPerPage + rowsPerPage
        ),

    [
      allUserData,
      order,
      orderBy,
      page,
      rowsPerPage,
    ]
  );


  // ====================== LOADING ======================

  if (loading) {
    return (
      <MainLayout>
        <Typography>Loading...</Typography>
      </MainLayout>
    );
  }


  // ====================== RETURN ======================

  return (
    <MainLayout>

      <Box sx={{ width: "100%" }}>

        <Paper sx={{ width: "100%", mb: 2 }}>
          {/* Search */}

          {/* Toolbar */}
          <EnhancedTableToolbar
            numSelected={selected.length}
          />
          <Box >
            <TextField
              label="Search Hospital"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              size="small"
              sx={{mx:2}}
            />
            {/* Search */}
            <TextField
              label="Search Hospital"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              size="small"
            />
          </Box>
          {/* Table */}
          <TableContainer>

            <Table
              sx={{ minWidth: 750 }}
              size={dense ? "small" : "medium"}
            >

              {/* Table Head */}
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={
                  handleSelectAllClick
                }
                onRequestSort={handleRequestSort}
                rowCount={
                  allUserData?.data?.length || 0
                }
              />

              {/* Table Body */}
              <TableBody>

                {visibleRows.map((row, index) => {

                  const isItemSelected =
                    selected.includes(row.id);

                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (

                    <TableRow
                      hover
                      onClick={(event) =>
                        handleClick(event, row.id)
                      }
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                      sx={{ cursor: "pointer" }}
                    >

                      {/* Checkbox */}
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                        />
                      </TableCell>

                      {/* Name */}
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.name}
                      </TableCell>

                      {/* Email */}
                      <TableCell align="left">
                        {row.email}
                      </TableCell>

                      {/* Contact */}
                      <TableCell align="left">
                        {row.contact}
                      </TableCell>

                      {/* Role */}
                      <TableCell align="left">
                        {row.role}
                      </TableCell>

                      {/* Role */}
                      <TableCell align="left">
                        <Button variant="contained" size="small" component={Link} to={`/user/${row.id}`}>
                          View
                        </Button>
                      </TableCell>

                    </TableRow>
                  );
                })}

                {/* Empty Rows */}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height:
                        (dense ? 33 : 53) *
                        emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}

              </TableBody>

            </Table>

          </TableContainer>

          {/* Pagination */}
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={
              allUserData?.pagination?.totalItems || 0
            }
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={
              handleChangeRowsPerPage
            }
          />

        </Paper>

        {/* Dense Switch */}
        <FormControlLabel
          control={
            <Switch
              checked={dense}
              onChange={handleChangeDense}
            />
          }
          label="Dense padding"
        />

      </Box>

    </MainLayout>
  );
}