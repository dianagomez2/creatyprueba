import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "sonner";
import Landing from "@/components/Landing";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Creaty — Mentorías con contexto, seguimiento e IA" },
      { name: "description", content: "Creaty ayuda a mentores empresariales a preparar, acompañar y dar seguimiento a más emprendimientos con contexto e IA." },
      { property: "og:title", content: "Creaty — Mentorías con contexto, seguimiento e IA" },
      { property: "og:description", content: "Acompaña más emprendimientos dedicando menos tiempo operativo a preparar cada mentoría." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
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
            background: "var(--creaty-black)",
            border: "1px solid color-mix(in oklab, var(--creaty-lime) 20%, transparent)",
            color: "var(--creaty-cream)",
          },
        }}
      />
    </>
  );
}
