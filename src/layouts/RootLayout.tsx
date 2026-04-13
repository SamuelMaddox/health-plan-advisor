import { Outlet } from "react-router";

import { Header } from "@/layouts/components/Header/Header";

export function RootLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
