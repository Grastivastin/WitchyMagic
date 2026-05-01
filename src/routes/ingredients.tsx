import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/ingredients")({
  beforeLoad: () => {
    throw redirect({ to: "/grimoire" });
  },
});
