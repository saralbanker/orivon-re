import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { SiteHeader } from "../components/SiteHeader";
import { CinematicFooter } from "../components/CinematicFooter";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-display font-bold text-gradient-cyan">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has drifted into the void.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow-cyan"
          >
            Take me home
          </Link>
        </div>
      </div>
    </div>
  );
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
      <CinematicFooter />
    </>
  );
}
