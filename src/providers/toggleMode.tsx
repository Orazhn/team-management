"use client";
import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex items-center space-x-2">
      <Button
        onClick={() => setTheme("light")}
        variant={"toggleMode"}
        aria-label="Activate light mode"
        className={cn(
          " h-10 w-[92px]  rounded-lg ",
          theme == "dark" && "bg-transparent "
        )}
      >
        <Sun className="mr-2 h-4 w-4" />
        Light
      </Button>
      <Button
        onClick={() => setTheme("dark")}
        variant={"toggleMode"}
        aria-label="Activate dark mode"
        className={cn(
          " h-10 w-[92px]  rounded-lg",
          theme == "light" && "bg-transparent text-black"
        )}
      >
        <Moon className="mr-2 h-4 w-4" />
        Dark
      </Button>
    </div>
  );
}
