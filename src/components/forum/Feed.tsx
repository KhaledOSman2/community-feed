import { CreatePost } from "./CreatePost";
import { PostCard } from "./PostCard";

const mockPosts = [
  {
    id: 1,
    author: {
      name: "Emma Wilson",
      handle: "@emmawilson",
      avatar: "EW",
      verified: true,
    },
    content: "Just shipped a major update to our design system! 🎨\n\nNew features include:\n• Dark mode support\n• Improved accessibility\n• 50+ new components\n\nCheck it out and let me know what you think!",
    tags: ["DesignSystem", "WebDev", "OpenSource"],
    stats: { likes: 234, comments: 45, reposts: 28 },
    timestamp: "2h",
    pinned: true,
  },
  {
    id: 2,
    author: {
      name: "David Chen",
      handle: "@davidchen",
      avatar: "DC",
      verified: false,
    },
    content: "Hot take: The best code is the code you don't write. \n\nSimplicity > Complexity, always.",
    stats: { likes: 892, comments: 156, reposts: 89 },
    timestamp: "4h",
  },
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
    id: 4,
    author: {
      name: "Alex Johnson",
      handle: "@alexj",
      avatar: "AJ",
      verified: false,
    },
    content: "Finally figured out why my CSS wasn't working after 3 hours of debugging...\n\nI had a typo. 😅\n\nWho else has been there?",
    stats: { likes: 567, comments: 234, reposts: 45 },
    timestamp: "8h",
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

export function Feed() {
  return (
    <div className="flex-1 max-w-2xl mx-auto px-4 py-6 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">Home</h1>
        <div className="flex gap-1 p-1 bg-secondary rounded-xl">
          <button className="px-4 py-2 text-sm font-medium bg-card text-foreground rounded-lg shadow-sm">
            For You
          </button>
          <button className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg transition-colors">
            Following
          </button>
        </div>
      </div>

      {/* Create Post */}
      <CreatePost />

      {/* Posts */}
      <div className="space-y-4">
        {mockPosts.map((post) => (
          <PostCard key={post.id} id={post.id} {...post} />
        ))}
      </div>
    </div>
  );
}
