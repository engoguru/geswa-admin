import React, { useEffect, useState } from "react";
import MainLayout from "../../layout/MainLayout";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Paper,
  Box,
  Input,
  CircularProgress,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { viewaAllBlog } from "../../../redux/slice/blogSlice";

function BlogMain() {
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");

  const { blogAll, loading } = useSelector((state) => state.blog);

  useEffect(() => {
    dispatch(viewaAllBlog({ search: "" }));
  }, [dispatch]);

  const handleSearch = () => {
    dispatch(viewaAllBlog({ search }));
  };

  console.log(blogAll)
  return (
    <MainLayout>
      {/* Top Bar */}
      <Paper
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
          mb: 4,
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Box sx={{ display: "flex", gap: 2 }}>
          <Input
            placeholder="Search Blog..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <Button
            variant="contained"
            onClick={handleSearch}
          >
            Search
          </Button>
        </Box>

        <Button
          variant="contained"
          color="success"
          component={Link}
          to="/blog/create"
        >
          Add Blog
        </Button>
      </Paper>

      {/* Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>S.No.</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Title</TableCell>
              {/* <TableCell sx={{ fontWeight: 700 }}>Topic</TableCell> */}
              <TableCell sx={{ fontWeight: 700 }}>Date</TableCell>
              {/* <TableCell sx={{ fontWeight: 700 }}>Action</TableCell> */}
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell align="center" colSpan={5}>
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : blogAll?.data?.length > 0 ? (
              blogAll?.data.map((blog, index) => (
                <TableRow key={blog.id}>
                  <TableCell>{index + 1}</TableCell>

                  <TableCell>{blog.title}</TableCell>

                  {/* <TableCell>{blog.topic}</TableCell> */}

                  <TableCell>
                    {new Date(blog.createdAt).toLocaleDateString("en-IN")}
                  </TableCell>

                  <TableCell>
                    {/* <Button
                      component={Link}
                      to={`/blog/${blog.id}`}
                      variant="contained"
                      size="small"
                      sx={{ mr: 2 }}
                    >
                      View
                    </Button> */}

                    {/* <Button
                      variant="contained"
                      color="error"
                      size="small"
                    >
                      Delete
                    </Button> */}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell align="center" colSpan={5}>
                  <Typography>No Blogs Found</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </MainLayout>
  );
}

export default BlogMain;