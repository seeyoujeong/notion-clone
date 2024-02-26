import { createRouter } from "@/core";
import { Detail, Home } from "@/pages";

export const notionRouter = createRouter([
  {
    path: "/",
    page: Home,
  },
  {
    path: "/:id",
    page: Detail,
  },
]);
