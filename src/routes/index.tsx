import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "sonner";
import Landing from "@/components/Landing";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <>
      <Landing />
      <Toaster
        theme="dark"
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#15170f",
            border: "1px solid rgba(229,254,0,0.2)",
            color: "#f2eee9",
          },
        }}
      />
    </>
  );
}
