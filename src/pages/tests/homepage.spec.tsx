import { act, render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { routerConfig } from "../../components/Router";
import { PostsResponse } from "../../types/posts.ts";

beforeEach(() => {
  fetchMock.resetMocks();
});

describe("HomePage", () => {
  it("should work", async () => {
    //arrange
    const responseToMock: PostsResponse[] = [
      {
        userId: 1,
        id: 1,
        title: "title1",
        body: "body1",
      },
      {
        userId: 1,
        id: 2,
        title: "title2",
        body: "body2",
      },
    ];

    fetchMock.mockResponse(() => {
      return Promise.resolve({
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(responseToMock),
      });
    });
    const router = createMemoryRouter(routerConfig, {
      initialEntries: ["/"],
      initialIndex: 0,
      future: { v7_normalizeFormMethod: true },
    });

    //act
    await act(async () => {
      render(<RouterProvider router={router} />);
    });

    //assert
    responseToMock.forEach((post, index) => {
      expect(screen.getByTestId(`table-row-${index}`)).toBeInTheDocument();
      expect(screen.getByText(post.body)).toBeInTheDocument();
      expect(screen.getByText(post.title)).toBeInTheDocument();
    });
  });
});
