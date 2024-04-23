import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useFetcher, useNavigate } from "react-router-dom";
import { PostActions, PostsResponse } from "../../types/posts";

interface PostPreviewModeProps {
  /**
   * Post-object is required, don't show this component until some object is passed
   */
  post: PostsResponse;
  /**
   * Letting the parent component know that we want to switch to edit mode
   * Currently only sending true as value, this can be also renamed to openEditMode or something like that.
   */
  onEditModeChange: (value: true) => void;
}

/**
 * Card like component showing the Post content and also has actions for edit (redirect) and deleting the post.
 */
export function PostPreviewMode({
  post,
  onEditModeChange,
}: PostPreviewModeProps) {
  const fetcher = useFetcher<PostActions>();
  const navigate = useNavigate();

  useEffect(() => {
    //when post is deleted, redirect to homepage
    if (fetcher.data?.deletedPost) {
      navigate("/");
    }
  }, [fetcher.data]);

  return (
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {post.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {post.body}
        </Typography>
        <CardActions>
          <Button size="small" onClick={() => onEditModeChange(true)}>
            Edit
          </Button>
          <fetcher.Form method="delete" action={`/post/${post.id}`}>
            <Button
              type="submit"
              size="small"
              disabled={fetcher.state === "submitting"}
            >
              Delete
            </Button>
          </fetcher.Form>
        </CardActions>
      </CardContent>
    </Card>
  );
}
