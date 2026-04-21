import { Outlet, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";
import { NotFoundOrivon } from "../components/NotFoundOrivon";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return <NotFoundOrivon />;
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Orivon — Award-winning digital design studio" },
      {
        name: "description",
        content:
          "Orivon is an independent design studio crafting award-winning brands, websites and digital products.",
      },
      { name: "author", content: "Orivon Studio" },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "Orivon — Award-winning digital design studio" },
      {
        property: "og:description",
        content:
          "Orivon is an independent design studio crafting award-winning brands, websites and digital products.",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@orivon" },
      { name: "twitter:title", content: "Orivon — Award-winning digital design studio" },
      { name: "description", content: "Orivon: Kinetic Canvas is a dynamic portfolio website showcasing creative work with advanced animations and interactive elements." },
      { property: "og:description", content: "Orivon: Kinetic Canvas is a dynamic portfolio website showcasing creative work with advanced animations and interactive elements." },
      { name: "twitter:description", content: "Orivon: Kinetic Canvas is a dynamic portfolio website showcasing creative work with advanced animations and interactive elements." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/a3a33600-661d-40ec-b8c3-afb687662bbd/id-preview-80f2f761--a47dd648-0387-4ca1-bf41-19a305e8571a.lovable.app-1776691508902.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/a3a33600-661d-40ec-b8c3-afb687662bbd/id-preview-80f2f761--a47dd648-0387-4ca1-bf41-19a305e8571a.lovable.app-1776691508902.png" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <>
      <SiteHeader />
      <main>
        <Outlet />
      </main>
      <SiteFooter />
    </>
  );
}
