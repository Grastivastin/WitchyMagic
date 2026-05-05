import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/scanner")({
  beforeLoad: () => {
    throw redirect({ to: "/mirror" });
  },
});
