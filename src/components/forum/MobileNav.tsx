import { Home, Compass, Bell, User, PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: Home, label: "Home", active: true },
  { icon: Compass, label: "Explore", active: false },
  { icon: PlusCircle, label: "Post", active: false, primary: true },
  { icon: Bell, label: "Alerts", active: false, badge: 3 },
  { icon: User, label: "Profile", active: false },
];

export function MobileNav() {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border px-2 py-2 z-50">
      <div className="flex items-center justify-around">
        {navItems.map((item) => (
          <button
            key={item.label}
            className={cn(
              "relative flex flex-col items-center gap-1 p-2 rounded-xl transition-colors",
              item.primary
                ? "text-primary"
                : item.active
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
          </button>
        ))}
      </div>
    </nav>
  );
}
