/**
 * Single post object that we get by fetching all posts.
 */
export interface PostsResponse {
  /**
   * Id of the user that created the post
   */
  userId: number;
  /**
   * Id of the post
   */
  id: number;
  /**
   * Title of the post.
   */
  title: string;
  /**
   * Post content.
   */
  body: string;
}

/**
 * Representing data object that we return when Post action is completed, or we throw error
 */
export interface PostActions {
  /**
   * Flag for POST method, if true the request was successful
   */
  createdPost?: true;
  /**
   * Flag for DELETE method, if true the request was successful
   */
  deletedPost?: true;
  /**
   * Flag for PUT method, if true the request was successful
   */
  updatedPost?: true;
}
