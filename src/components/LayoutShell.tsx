"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Hide Navbar on /coming and /experiences (and optionally nested paths)
  const hideLayout =
    pathname === "/coming" ||
    pathname.startsWith("/experiences");

  return (
    <>
      {!hideLayout && <Navbar />}
      {children}
    </>
  );
}

