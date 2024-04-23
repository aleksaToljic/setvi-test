import { Box, Button, Paper, Stack, TextField } from "@mui/material";
import { useEffect } from "react";
import { useFetcher, useNavigate } from "react-router-dom";
import { PostActions, PostsResponse } from "../../types/posts";

interface PostEditModeProps {
  /**
   * Initial value to populate inputs
   */
  initialValue: PostsResponse;
}

/**
 * Component to use for deleting or updating existing post, or creating a new one
 */
export function PostEditMode({ initialValue: post }: PostEditModeProps) {
  const fetcher = useFetcher<PostActions>();
  const navigate = useNavigate();

  useEffect(() => {
    //if any of these actions is completed, redirect to homepage
    if (
      fetcher.data?.deletedPost ||
      fetcher.data?.updatedPost ||
      fetcher.data?.createdPost
    ) {
      navigate("/");
    }
  }, [fetcher.data, navigate]);

  return (
    <Paper>
      <Box p={2}>
        <fetcher.Form method="post" action="/post/new">
          <Stack spacing={2}>
            <TextField
              placeholder="Title"
              name="title"
              defaultValue={post?.title}
              required
            />
            <TextField
              placeholder="Body"
              name="body"
              defaultValue={post?.body}
              rows={2}
              multiline
            />
            <Button disabled={fetcher.state === "submitting"} type="submit">
              Submit
            </Button>
          </Stack>
        </fetcher.Form>

        {post.id ? (
          <fetcher.Form method="delete" action={`/post/${post.id}`}>
            <Stack>
              <Button disabled={fetcher.state === "submitting"} type="submit">
                Delete
              </Button>
            </Stack>
          </fetcher.Form>
        ) : null}
      </Box>
    </Paper>
  );
}
