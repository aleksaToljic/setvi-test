import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "../pages";
import PostDetailsPage from "../pages/post/_id";
import { PostActions } from "../types/posts";
import { ErrorElement } from "./ErrorBoundary";

const router = createBrowserRouter(
  [
    {
      path: "/",
      index: true,
      element: <Homepage />,
      errorElement: <ErrorElement />,
      loader: ({ request }) => {
        return fetch("https://jsonplaceholder.typicode.com/posts", {
          signal: request.signal,
        });
      },
    },
    {
      path: "/post/:id",
      element: <PostDetailsPage />,
      errorElement: <ErrorElement />,
      loader: ({ request, params }) => {
        //Don't fetch if the path is `post/new`
        if (params.id === "new") {
          return null;
        }
        return fetch(
          `https://jsonplaceholder.typicode.com/posts/${params.id}`,
          {
            signal: request.signal,
          },
        );
      },
      action: async ({ request, params }): Promise<PostActions> => {
        //TODO this could probably be simplified with additional (children) routes that have only action prop
        if (params.id === "new") {
          const formData = await request.formData();
          const res = await fetch(
            new Request("https://jsonplaceholder.typicode.com/posts", {
              method: "POST",
              body: JSON.stringify(formData),
              signal: request.signal,
            }),
          );

          if (res.ok) {
            //TODO we could return id here, but since we redirect to homepage and also this is fake api (it's not really created),
            // we just need some info that the action is completed
            return { createdPost: true };
          } else {
            throw "Creating new post failed.";
          }
        } else if (request.method === "DELETE") {
          const res = await fetch(
            new Request(
              `https://jsonplaceholder.typicode.com/posts/${params.id}`,
              { method: "DELETE", signal: request.signal },
            ),
          );

          if (res.ok) {
            return { deletedPost: true };
          } else {
            throw `Deleting post with id: ${params.id} failed.`;
          }
        } else {
          const formData = await request.formData();
          const res = await fetch(
            `https://jsonplaceholder.typicode.com/posts/${params.id}`,
            {
              method: "PUT",
              body: JSON.stringify(formData),
              signal: request.signal,
            },
          );

          if (res.ok) {
            return { updatedPost: true };
          } else {
            throw `Updating post with id: ${params.id} failed.`;
          }
        }
      },
    },
  ],
  { future: { v7_normalizeFormMethod: true } },
);

/**
 * One of the router components, there can be many as there are domains in the system
 */
export function Router() {
  return <RouterProvider router={router} />;
}
