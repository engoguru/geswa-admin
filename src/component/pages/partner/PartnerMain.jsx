import React, { useEffect, useState } from "react";
import MainLayout from "../../layout/MainLayout";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  MenuItem,
  Button,
  Stack,
  Pagination,
} from "@mui/material";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllHospitals } from "../../../redux/slice/hospitalSlice";
import { Link } from "react-router-dom";

function PartnerMain() {

  const dispatch=useDispatch()
  const [hospitals, setHospitals] = useState([]);

  //  Filters
  const [search, setSearch] = useState("");
  const [service, setService] = useState("");
  const [availability, setAvailability] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  //  Pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const limit = 50;

  //  Fetch API
   const{hospitalAllData}=useSelector((state)=>state.hospital)

  //  Debounce search (production best practice)
  useEffect(() => {
    const timer = setTimeout(() => {
        dispatch(fetchAllHospitals({search, service, availability, city, state, page,limit}))
    }, 400);

    return () => clearTimeout(timer);
  }, [search, service, availability, city, state, page,limit]);

  return (
    <MainLayout>
      <div style={{ padding: 20 }}>

        {/*  FILTER BAR */}
        <Stack direction="row" spacing={2} flexWrap="wrap" marginBottom={2}>

          {/* Search */}
          <TextField
            label="Search Hospital"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            size="small"
          />

          {/* Service */}
          <TextField
            label="Service"
            value={service}
            onChange={(e) => setService(e.target.value)}
            size="small"
          />

          {/* Availability */}
          <TextField
            select
            label="Availability"
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
            size="small"
            style={{ width: 150 }}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="24 Hours">24 Hours</MenuItem>
            <MenuItem value="Day">Day</MenuItem>
            <MenuItem value="Night">Night</MenuItem>
          </TextField>

          {/* City */}
          <TextField
            label="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            size="small"
          />

          {/* State */}
          <TextField
            label="State"
            value={state}
            onChange={(e) => setState(e.target.value)}
            size="small"
          />

          {/* Clear */}
          <Button
            variant="outlined"
            onClick={() => {
              setSearch("");
              setService("");
              setAvailability("");
              setCity("");
              setState("");
              setPage(1);
            }}
          >
            Clear
          </Button>

          <Button
          variant="outlined"
          component={Link}
          to="/partner/add"
              >
           PARTNER +
          </Button>
        </Stack>

        {/*  TABLE */}
        <TableContainer component={Paper}>
          <Table>

            <TableHead>
              <TableRow>
                <TableCell>S.No</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Contact</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>city</TableCell>
                <TableCell>State</TableCell>
                <TableCell>Availability</TableCell>
                <TableCell>Action</TableCell>
                <TableCell>Add Doctor</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {hospitalAllData?.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell>{(page - 1) * limit + index + 1}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.contact}</TableCell>
                  <TableCell>{item.address}</TableCell>
                  <TableCell>{item.city}</TableCell>

                  <TableCell>
                    {item.state}
                  </TableCell>

                  <TableCell>{item.availability}</TableCell>

                  <TableCell>
                    <Button size="small" variant="outlined" component={Link} to={`/partner/update/${item?.id}`}>
                      View
                    </Button>
                  </TableCell>

                  <TableCell>
                    <Button size="small" variant="contained" component={Link} to={`/add/doctore/${item.id}`}>
                      Add +
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>

          </Table>
        </TableContainer>

        {/*  PAGINATION */}
        <Stack alignItems="center" marginTop={5} sx={{pt:3}}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(e, value) => setPage(value)}
            color="primary"
          />
        </Stack>

      </div>
    </MainLayout>
  );
}

export default PartnerMain;