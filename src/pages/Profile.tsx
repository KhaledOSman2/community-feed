import { LeftSidebar } from "@/components/forum/LeftSidebar";
import { RightSidebar } from "@/components/forum/RightSidebar";
import { MobileNav } from "@/components/forum/MobileNav";
import { ThemeToggle } from "@/components/forum/ThemeToggle";
import { PostCard } from "@/components/forum/PostCard";
import { Calendar, Link as LinkIcon, MapPin, ArrowLeft, Settings } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const userProfile = {
  name: "John Doe",
  handle: "@johndoe",
  avatar: "JD",
  coverImage: "",
  bio: "Full-stack developer passionate about building amazing web experiences. React enthusiast. Open source contributor. Coffee lover ☕",
  location: "San Francisco, CA",
  website: "johndoe.dev",
  joinDate: "March 2023",
  verified: true,
  stats: {
    posts: 248,
    followers: "12.5K",
    following: 892,
    likes: "4.2K",
  },
};

const userPosts = [
  {
    id: 1,
    author: {
      name: "John Doe",
      handle: "@johndoe",
      avatar: "JD",
      verified: true,
    },
    content: "Just shipped a new feature that I've been working on for weeks! The satisfaction of seeing your code come to life never gets old. 🚀\n\nWhat's everyone else working on today?",
    stats: { likes: 234, comments: 45, reposts: 12 },
    timestamp: "2h ago",
    tags: ["coding", "webdev"],
  },
  {
    id: 2,
    author: {
      name: "John Doe",
      handle: "@johndoe",
      avatar: "JD",
      verified: true,
    },
    content: "Hot take: TypeScript has made me a better JavaScript developer. The type safety isn't just about catching bugs - it's about thinking more clearly about your data structures.",
    stats: { likes: 567, comments: 89, reposts: 45 },
    timestamp: "1d ago",
    tags: ["typescript", "javascript"],
  },
  {
    id: 3,
    author: {
      name: "John Doe",
      handle: "@johndoe",
      avatar: "JD",
      verified: true,
    },
    content: "Learning in public has been one of the best decisions I've made for my career. Don't be afraid to share your journey - even the mistakes!",
    stats: { likes: 892, comments: 124, reposts: 78 },
    timestamp: "3d ago",
    tags: ["career", "learning"],
  },
];

const Profile = () => {
  const [activeTab, setActiveTab] = useState<"posts" | "replies" | "likes">("posts");
  const [isFollowing, setIsFollowing] = useState(false);

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
          <div className="sticky top-0 bg-background/80 backdrop-blur-md border-b border-border p-4 z-10 flex items-center gap-4">
            <Link to="/" className="p-2 hover:bg-secondary rounded-full transition-colors">
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </Link>
            <div>
              <h1 className="text-xl font-bold text-foreground">{userProfile.name}</h1>
              <p className="text-sm text-muted-foreground">{userProfile.stats.posts} posts</p>
            </div>
          </div>

          {/* Cover Image */}
          <div className="h-48 bg-gradient-to-r from-primary/30 to-primary/10" />

          {/* Profile Info */}
          <div className="px-4 pb-4">
            <div className="flex justify-between items-start -mt-16 mb-4">
              <Avatar className="w-32 h-32 border-4 border-background">
                <AvatarImage src="" />
                <AvatarFallback className="bg-primary text-primary-foreground text-4xl font-bold">
                  {userProfile.avatar}
                </AvatarFallback>
              </Avatar>
              <div className="flex gap-2 mt-20">
                <Link to="/settings">
                  <button className="p-2 border border-border rounded-full hover:bg-secondary transition-colors">
                    <Settings className="w-5 h-5 text-foreground" />
                  </button>
                </Link>
                <button
                  onClick={() => setIsFollowing(!isFollowing)}
                  className={`px-5 py-2 rounded-full font-semibold transition-colors ${
                    isFollowing
                      ? "border border-border text-foreground hover:border-red-500 hover:text-red-500"
                      : "bg-primary text-primary-foreground hover:opacity-90"
                  }`}
                >
                  {isFollowing ? "Following" : "Follow"}
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold text-foreground">{userProfile.name}</h2>
                {userProfile.verified && (
                  <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <p className="text-muted-foreground">{userProfile.handle}</p>
              <p className="text-foreground">{userProfile.bio}</p>

              <div className="flex flex-wrap gap-4 text-muted-foreground text-sm">
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {userProfile.location}
                </span>
                <a href={`https://${userProfile.website}`} className="flex items-center gap-1 text-primary hover:underline">
                  <LinkIcon className="w-4 h-4" />
                  {userProfile.website}
                </a>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Joined {userProfile.joinDate}
                </span>
              </div>

              <div className="flex gap-5 text-sm">
                <span>
                  <strong className="text-foreground">{userProfile.stats.following}</strong>{" "}
                  <span className="text-muted-foreground">Following</span>
                </span>
                <span>
                  <strong className="text-foreground">{userProfile.stats.followers}</strong>{" "}
                  <span className="text-muted-foreground">Followers</span>
                </span>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-border">
            {[
              { id: "posts", label: "Posts" },
              { id: "replies", label: "Replies" },
              { id: "likes", label: "Likes" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex-1 py-4 text-center font-medium transition-colors relative ${
                  activeTab === tab.id
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-primary rounded-full" />
                )}
              </button>
            ))}
          </div>

          {/* Posts */}
          <div className="divide-y divide-border">
            {userPosts.map((post) => (
              <PostCard key={post.id} {...post} />
            ))}
          </div>
        </main>
        
        <RightSidebar />
      </div>

      <MobileNav />
      <div className="h-20 lg:hidden" />
    </div>
  );
};

export default Profile;
