import { Container, Grid } from "@mui/material";
import { useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import { PostEditMode } from "../../components/post/PostEditMode";
import { PostPreviewMode } from "../../components/post/PostPreviewMode";
import { PostsResponse } from "../../types/posts";

function PostDetailsPage() {
  const post = (useLoaderData() as PostsResponse) || {};
  const params = useParams<{ id: string }>();
  const [isEditMode, setIsEditMode] = useState(params.id === "new");

  return (
    <Container>
      <Grid
        container
        justifyContent="center"
        alignContent="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={12} sm={9} md={8} lg={7} xl={6}>
          {isEditMode ? (
            <PostEditMode initialValue={post} />
          ) : (
            <PostPreviewMode
              post={post}
              onEditModeChange={(isEditMode) => setIsEditMode(isEditMode)}
            />
          )}
        </Grid>
      </Grid>
    </Container>
  );
}

export default PostDetailsPage;
