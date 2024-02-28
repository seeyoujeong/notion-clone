import { Router } from "@/core";
import { Detail, Home } from "@/pages";

export const notionRouter = new Router([
  {
    path: "/",
    page: Home,
  },
  {
    path: "/:id",
    page: Detail,
  },
]);
