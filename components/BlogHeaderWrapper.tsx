"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { MobileMenu } from "@/components/MobileMenu";
import { useTheme } from "next-themes";

export function BlogHeaderWrapper() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  return (
    <>
      <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <MobileMenu
        isOpen={isMenuOpen}
        setIsOpen={setIsMenuOpen}
        dark={resolvedTheme === "dark"}
        setDark={(val) => setTheme(val ? "dark" : "light")}
      />
    </>
  );
}
