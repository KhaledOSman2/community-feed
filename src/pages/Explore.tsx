import { LeftSidebar } from "@/components/forum/LeftSidebar";
import { RightSidebar } from "@/components/forum/RightSidebar";
import { MobileNav } from "@/components/forum/MobileNav";
import { ThemeToggle } from "@/components/forum/ThemeToggle";
import { Search, TrendingUp, Hash, Flame, Clock, Users } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";

const categories = [
  { name: "Technology", icon: "💻", posts: 1250, color: "bg-blue-500/10 text-blue-500" },
  { name: "Design", icon: "🎨", posts: 890, color: "bg-purple-500/10 text-purple-500" },
  { name: "Business", icon: "💼", posts: 654, color: "bg-green-500/10 text-green-500" },
  { name: "Science", icon: "🔬", posts: 432, color: "bg-yellow-500/10 text-yellow-500" },
  { name: "Gaming", icon: "🎮", posts: 1100, color: "bg-red-500/10 text-red-500" },
  { name: "Music", icon: "🎵", posts: 567, color: "bg-pink-500/10 text-pink-500" },
];

const trendingPosts = [
  {
    id: 1,
    author: { name: "Tech Insider", handle: "@techinsider", avatar: "TI", verified: true },
    content: "The future of AI in web development is here! Check out these amazing tools...",
    likes: 2400,
    comments: 189,
    time: "2h",
  },
  {
    id: 2,
    author: { name: "Design Weekly", handle: "@designweekly", avatar: "DW", verified: true },
    content: "10 UI trends that will dominate 2024. Thread 🧵",
    likes: 1890,
    comments: 124,
    time: "4h",
  },
  {
    id: 3,
    author: { name: "Dev Community", handle: "@devcom", avatar: "DC", verified: false },
    content: "What's your favorite programming language and why?",
    likes: 1200,
    comments: 456,
    time: "6h",
  },
];

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"trending" | "categories" | "users">("trending");

  useEffect(() => {
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
        
        <main className="flex-1 min-h-screen border-x border-border">
          {/* Header */}
          <div className="sticky top-0 bg-background/80 backdrop-blur-md border-b border-border p-4 z-10">
            <h1 className="text-xl font-bold text-foreground mb-4">Explore</h1>
            
            {/* Search */}
            <div className="relative mb-4">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search topics, posts, or people..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-secondary text-foreground placeholder:text-muted-foreground pl-12 pr-4 py-3 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            {/* Tabs */}
            <div className="flex gap-1">
              <button
                onClick={() => setActiveTab("trending")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === "trending"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-secondary"
                }`}
              >
                <Flame className="w-4 h-4" />
                Trending
              </button>
              <button
                onClick={() => setActiveTab("categories")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === "categories"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-secondary"
                }`}
              >
                <Hash className="w-4 h-4" />
                Categories
              </button>
              <button
                onClick={() => setActiveTab("users")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === "users"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-secondary"
                }`}
              >
                <Users className="w-4 h-4" />
                Users
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            {activeTab === "trending" && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Trending Now
                </h2>
                {trendingPosts.map((post) => (
                  <div
                    key={post.id}
                    className="bg-card border border-border rounded-2xl p-4 hover:bg-secondary/50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-start gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src="" />
                        <AvatarFallback className="bg-primary/10 text-primary font-medium">
                          {post.author.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-foreground">{post.author.name}</span>
                          {post.author.verified && (
                            <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          )}
                          <span className="text-muted-foreground text-sm">{post.author.handle}</span>
                          <span className="text-muted-foreground text-sm">· {post.time}</span>
                        </div>
                        <p className="text-foreground mt-1">{post.content}</p>
                        <div className="flex items-center gap-6 mt-3 text-muted-foreground text-sm">
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {post.comments} comments
                          </span>
                          <span>❤️ {post.likes.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "categories" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {categories.map((category) => (
                  <div
                    key={category.name}
                    className="bg-card border border-border rounded-2xl p-5 hover:bg-secondary/50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl ${category.color}`}>
                        {category.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground text-lg">{category.name}</h3>
                        <p className="text-muted-foreground text-sm">{category.posts.toLocaleString()} posts</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "users" && (
              <div className="space-y-3">
                {[
                  { name: "Sarah Chen", handle: "@sarahchen", bio: "Frontend Developer | React enthusiast", followers: "12.5K", avatar: "SC", verified: true },
                  { name: "Alex Rivera", handle: "@alexr", bio: "UI/UX Designer | Creating beautiful interfaces", followers: "8.2K", avatar: "AR", verified: false },
                  { name: "Mike Johnson", handle: "@mikej", bio: "Full Stack Dev | Open source contributor", followers: "15.1K", avatar: "MJ", verified: true },
                  { name: "Emma Wilson", handle: "@emmaw", bio: "Product Manager | Building the future", followers: "9.8K", avatar: "EW", verified: true },
                ].map((user) => (
                  <div
                    key={user.handle}
                    className="bg-card border border-border rounded-2xl p-4 flex items-center gap-4"
                  >
                    <Avatar className="w-14 h-14">
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-primary/10 text-primary font-medium text-lg">
                        {user.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-foreground">{user.name}</span>
                        {user.verified && (
                          <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <p className="text-muted-foreground text-sm">{user.handle}</p>
                      <p className="text-foreground text-sm mt-1">{user.bio}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">{user.followers} followers</p>
                      <button className="mt-2 px-4 py-1.5 bg-primary text-primary-foreground text-sm font-medium rounded-full hover:opacity-90 transition-opacity">
                        Follow
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
        
        <RightSidebar />
      </div>

      <MobileNav />
      <div className="h-20 lg:hidden" />
    </div>
  );
};

export default Explore;
