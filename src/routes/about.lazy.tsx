import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/about")({
  component: About,
});

function About() {
  return <div className="p-2 bg-[red]">Hello from About!</div>;
}
