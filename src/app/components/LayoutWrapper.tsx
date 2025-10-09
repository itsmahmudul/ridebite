"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // ✅ Hide Navbar & Footer for these routes
  const hideLayoutRoutes = [
    "/admin",
    "/user",
    "/dashboard",
    "/not-found",
  ];

  const shouldHideLayout = hideLayoutRoutes.some((route) =>
    pathname?.startsWith(route)
  );

  return (
    <>
      {!shouldHideLayout && <Navbar />}
      <main className="min-h-screen">{children}</main>
      {!shouldHideLayout && <Footer />}
    </>
  );
}
