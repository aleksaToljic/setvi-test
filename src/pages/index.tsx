import {
  AppBar,
  Box,
  Button,
  Container,
  Grid,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { PostsResponse } from "../types/posts";

const ROWS_PER_PAGE = 10;
function Homepage() {
  const [page, setPage] = useState(0);
  const navigate = useNavigate();
  const posts = useLoaderData() as PostsResponse[];

  //TODO when I'm back on this page we should change the page to the previous visited page, and maybe even highlight the post that was clicked last
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Box style={{ flexGrow: 1 }} textAlign="right">
            <Button onClick={() => navigate("/post/new")}>Create Post</Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Container>
        <Box mt={5}>
          <Stack spacing={3}>
            <Grid justifyContent="center" container>
              <Grid item>
                <Box>
                  <Typography variant="h2">Posts</Typography>
                </Box>
              </Grid>
            </Grid>
            <Grid container justifyContent="center">
              <Grid item>
                <TableContainer style={{ maxWidth: 700 }}>
                  <Table>
                    <TableBody>
                      {posts
                        .slice(
                          page * ROWS_PER_PAGE,
                          page * ROWS_PER_PAGE + ROWS_PER_PAGE,
                        )
                        .map((post) => (
                          <TableRow
                            key={post.id}
                            tabIndex={-1}
                            hover
                            style={{ cursor: "pointer" }}
                            role="button"
                            onClick={() => navigate(`post/${post.id}`)}
                          >
                            <TableCell>
                              <Stack spacing={1}>
                                <Typography variant="h6">
                                  {post.title}
                                </Typography>
                                <Typography variant="body1">
                                  {post.body}
                                </Typography>
                              </Stack>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                  <TablePagination
                    component="div"
                    count={posts.length}
                    rowsPerPageOptions={[ROWS_PER_PAGE]}
                    rowsPerPage={ROWS_PER_PAGE}
                    page={page}
                    onPageChange={(_, newPage) => setPage(newPage)}
                  />
                </TableContainer>
              </Grid>
            </Grid>
          </Stack>
        </Box>
      </Container>
    </>
  );
}

export default Homepage;
