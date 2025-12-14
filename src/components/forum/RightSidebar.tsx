import { TrendingUp, Users, Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const trendingTopics = [
  { tag: "#ReactJS", posts: "2.4K posts" },
  { tag: "#WebDev", posts: "1.8K posts" },
  { tag: "#JavaScript", posts: "1.5K posts" },
  { tag: "#TailwindCSS", posts: "892 posts" },
  { tag: "#TypeScript", posts: "756 posts" },
];

const suggestedUsers = [
  { name: "Sarah Chen", handle: "@sarahchen", avatar: "SC", verified: true },
  { name: "Alex Rivera", handle: "@alexr", avatar: "AR", verified: false },
  { name: "Mike Johnson", handle: "@mikej", avatar: "MJ", verified: true },
];

export function RightSidebar() {
  return (
    <aside className="hidden xl:flex flex-col w-80 h-screen sticky top-0 p-4 space-y-4 overflow-y-auto">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search discussions..."
          className="w-full bg-secondary text-foreground placeholder:text-muted-foreground pl-10 pr-4 py-3 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>

      {/* Trending */}
      <div className="bg-card border border-border rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground">Trending Topics</h3>
        </div>
        <div className="space-y-3">
          {trendingTopics.map((topic) => (
            <button
              key={topic.tag}
              className="w-full text-left hover:bg-secondary p-2 rounded-lg transition-colors"
            >
              <p className="font-medium text-primary">{topic.tag}</p>
              <p className="text-sm text-muted-foreground">{topic.posts}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Suggested Users */}
      <div className="bg-card border border-border rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground">Who to Follow</h3>
        </div>
        <div className="space-y-3">
          {suggestedUsers.map((user) => (
            <div
              key={user.handle}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary transition-colors"
            >
              <Avatar className="w-10 h-10">
                <AvatarImage src="" />
                <AvatarFallback className="bg-primary/10 text-primary font-medium">
                  {user.avatar}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1">
                  <p className="font-medium text-foreground truncate">{user.name}</p>
                  {user.verified && (
                    <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <p className="text-sm text-muted-foreground truncate">{user.handle}</p>
              </div>
              <button className="px-4 py-1.5 bg-primary text-primary-foreground text-sm font-medium rounded-full hover:opacity-90 transition-opacity">
                Follow
              </button>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
