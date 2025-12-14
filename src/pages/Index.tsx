import { LeftSidebar } from "@/components/forum/LeftSidebar";
import { RightSidebar } from "@/components/forum/RightSidebar";
import { Feed } from "@/components/forum/Feed";
import { MobileNav } from "@/components/forum/MobileNav";
import { ThemeToggle } from "@/components/forum/ThemeToggle";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <ThemeToggle />
      
      <div className="flex w-full max-w-7xl mx-auto">
        <LeftSidebar />
        <Feed />
        <RightSidebar />
      </div>

      <MobileNav />
      
      {/* Bottom padding for mobile nav */}
      <div className="h-20 lg:hidden" />
    </div>
  );
};

export default Index;
