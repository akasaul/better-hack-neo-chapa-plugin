import { Link } from "@tanstack/react-router";
import { ModeToggle } from "./mode-toggle";
import UserMenu from "./user-menu";
import { Plane } from "lucide-react";

export default function Header() {
  const links = [
    { to: "/", label: "Home" },
    { to: "/dashboard", label: "Dashboard" },
    // { to: "/todos", label: "Todos" },
    { to: "/ai", label: "AI Chat" },
  ] as const;

  return (
    <div>
      <header className="border-b bg-card">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <Plane className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">
              Star Travel AI
            </span>
          </div>

          <nav className="hidden items-center gap-8 md:flex">
            {links.map(({ to, label }) => {
              return (
                <Link
                  key={to}
                  to={to}
                  className={`text-sm font-medium hover:text-primary transition-colors ${
                    to === location.pathname
                      ? "text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <ModeToggle />
            <UserMenu />
          </div>
        </div>
      </header>
      <hr />
    </div>
  );
}
