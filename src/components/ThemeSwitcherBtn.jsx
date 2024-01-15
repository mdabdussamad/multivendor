"use client";
import { useState, useEffect } from "react"; 
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "lucide-react";

export default function ThemeSwitcherBtn() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }
  return (
    <button
      className="text-lime-700 dark:text-lime-500"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "light" ? <MoonIcon /> : <SunIcon />}
    </button>
  );
}
