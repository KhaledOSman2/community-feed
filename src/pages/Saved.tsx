import { Bookmark } from "lucide-react";
import { LeftSidebar } from "@/components/forum/LeftSidebar";
import { RightSidebar } from "@/components/forum/RightSidebar";
import { MobileNav } from "@/components/forum/MobileNav";
import { ThemeToggle } from "@/components/forum/ThemeToggle";
import { PostCard } from "@/components/forum/PostCard";

const savedPosts = [
  {
    id: 3,
    author: {
      name: "Sarah Miller",
      handle: "@sarahmiller",
      avatar: "SM",
      verified: true,
    },
    content: "Excited to announce that I'll be speaking at ReactConf 2024! 🎉\n\nMy talk will cover advanced patterns for building scalable React applications. Can't wait to meet everyone there!",
    tags: ["ReactJS", "Conference", "Speaking"],
    stats: { likes: 1243, comments: 89, reposts: 234 },
    timestamp: "6h",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: 5,
    author: {
      name: "Maria Garcia",
      handle: "@mariagarcia",
      avatar: "MG",
      verified: true,
    },
    content: "Pro tip for developers:\n\nTake breaks. Touch grass. Your code will still be there when you get back, but your mental health won't wait. 🌿",
    tags: ["DevLife", "MentalHealth", "WorkLifeBalance"],
    stats: { likes: 2341, comments: 156, reposts: 567 },
    timestamp: "12h",
  },
];

export default function Saved() {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex max-w-7xl mx-auto">
        <LeftSidebar />

        <main className="flex-1 max-w-2xl border-x border-border min-h-screen">
          {/* Header */}
          <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border p-4">
            <h1 className="text-xl font-bold text-foreground">Saved Posts</h1>
            <p className="text-sm text-muted-foreground">@you</p>
          </div>

          {/* Saved Posts */}
          <div className="p-4 space-y-4">
            {savedPosts.length > 0 ? (
              savedPosts.map((post) => (
                <PostCard key={post.id} id={post.id} {...post} />
              ))
            ) : (
              <div className="text-center py-16">
                <Bookmark className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">No saved posts yet</h3>
                <p className="text-muted-foreground">
                  Save posts by clicking the bookmark icon to see them here.
                </p>
              </div>
            )}
          </div>
        </main>

        <RightSidebar />
      </div>

      <MobileNav />
      <ThemeToggle />
    </div>
  );
}
