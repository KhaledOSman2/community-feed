import { Home, Compass, Bell, User, PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: Compass, label: "Explore", path: "/explore" },
  { icon: PlusCircle, label: "Post", path: "/", primary: true },
  { icon: Bell, label: "Alerts", path: "/notifications", badge: 3 },
  { icon: User, label: "Profile", path: "/profile" },
];

export function MobileNav() {
  const location = useLocation();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border px-2 py-2 z-50">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.label}
              to={item.path}
              className={cn(
                "relative flex flex-col items-center gap-1 p-2 rounded-xl transition-colors",
                item.primary
                  ? "text-primary"
                  : isActive
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              {item.primary ? (
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center -mt-6 shadow-lg">
                  <item.icon className="w-6 h-6 text-primary-foreground" />
                </div>
              ) : (
                <>
                  <item.icon className="w-6 h-6" />
                  {item.badge && (
                    <span className="absolute top-1 right-1 bg-primary text-primary-foreground text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </>
              )}
              <span className={cn("text-xs", item.primary && "mt-1")}>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
