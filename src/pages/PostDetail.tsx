import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Heart, MessageCircle, Repeat2, Share, MoreHorizontal, Bookmark } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { CommentSection } from "@/components/forum/CommentSection";
import { ShareDialog } from "@/components/forum/ShareDialog";
import { RepostDialog } from "@/components/forum/RepostDialog";
import { LeftSidebar } from "@/components/forum/LeftSidebar";
import { RightSidebar } from "@/components/forum/RightSidebar";
import { MobileNav } from "@/components/forum/MobileNav";
import { ThemeToggle } from "@/components/forum/ThemeToggle";

// Mock post data
const mockPost = {
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
  fullTimestamp: "2:30 PM · Dec 15, 2024",
  image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=60",
};

const mockComments = [
  {
    id: 1,
    author: {
      name: "David Chen",
      handle: "@davidchen",
      avatar: "DC",
      verified: false,
    },
    content: "This is amazing! Can't wait to try the dark mode feature. 🌙",
    timestamp: "1h",
    likes: 12,
    replies: [
      {
        id: 2,
        author: {
          name: "Emma Wilson",
          handle: "@emmawilson",
          avatar: "EW",
          verified: true,
        },
        content: "Thanks David! Let me know if you have any feedback.",
        timestamp: "45m",
        likes: 5,
      },
    ],
  },
  {
    id: 3,
    author: {
      name: "Sarah Miller",
      handle: "@sarahmiller",
      avatar: "SM",
      verified: true,
    },
    content: "The accessibility improvements are exactly what we needed. Great work! 👏",
    timestamp: "30m",
    likes: 8,
  },
  {
    id: 4,
    author: {
      name: "Alex Johnson",
      handle: "@alexj",
      avatar: "AJ",
      verified: false,
    },
    content: "How long did it take to build all 50 components?",
    timestamp: "15m",
    likes: 3,
  },
];

export default function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likeCount, setLikeCount] = useState(mockPost.stats.likes);
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [showRepostDialog, setShowRepostDialog] = useState(false);
  const [comments, setComments] = useState(mockComments);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  const handleAddComment = (content: string) => {
    const newComment = {
      id: Date.now(),
      author: {
        name: "You",
        handle: "@you",
        avatar: "YU",
        verified: false,
      },
      content,
      timestamp: "Just now",
      likes: 0,
    };
    setComments([newComment, ...comments]);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex max-w-7xl mx-auto">
        <LeftSidebar />

        <main className="flex-1 max-w-2xl border-x border-border min-h-screen">
          {/* Header */}
          <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border p-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(-1)}
                className="p-2 rounded-full hover:bg-secondary transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-foreground" />
              </button>
              <h1 className="text-xl font-bold text-foreground">Post</h1>
            </div>
          </div>

          {/* Post Content */}
          <article className="p-4 border-b border-border">
            <div className="flex gap-3">
              <Avatar className="w-12 h-12 flex-shrink-0">
                <AvatarImage src="" />
                <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                  {mockPost.author.avatar}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-foreground">{mockPost.author.name}</span>
                      {mockPost.author.verified && (
                        <svg className="w-4 h-4 text-primary flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <span className="text-muted-foreground text-sm">{mockPost.author.handle}</span>
                  </div>
                  <button className="p-2 rounded-full hover:bg-secondary text-muted-foreground transition-colors">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-foreground text-lg whitespace-pre-wrap">{mockPost.content}</p>

              {mockPost.tags && mockPost.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {mockPost.tags.map((tag) => (
                    <span key={tag} className="text-primary hover:underline cursor-pointer">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {mockPost.image && (
                <div className="mt-4 rounded-xl overflow-hidden border border-border">
                  <img src={mockPost.image} alt="Post attachment" className="w-full h-auto" />
                </div>
              )}

              <p className="text-muted-foreground text-sm mt-4">{mockPost.fullTimestamp}</p>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-6 py-4 mt-4 border-t border-b border-border text-sm">
              <span className="text-muted-foreground">
                <strong className="text-foreground">{mockPost.stats.reposts}</strong> Reposts
              </span>
              <span className="text-muted-foreground">
                <strong className="text-foreground">{likeCount}</strong> Likes
              </span>
              <span className="text-muted-foreground">
                <strong className="text-foreground">{comments.length}</strong> Comments
              </span>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-around py-2">
              <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group p-2">
                <div className="p-2 rounded-full group-hover:bg-primary/10 transition-colors">
                  <MessageCircle className="w-6 h-6" />
                </div>
              </button>

              <button
                onClick={() => setShowRepostDialog(true)}
                className="flex items-center gap-2 text-muted-foreground hover:text-green-500 transition-colors group p-2"
              >
                <div className="p-2 rounded-full group-hover:bg-green-500/10 transition-colors">
                  <Repeat2 className="w-6 h-6" />
                </div>
              </button>

              <button
                onClick={handleLike}
                className={cn(
                  "flex items-center gap-2 transition-colors group p-2",
                  liked ? "text-primary" : "text-muted-foreground hover:text-primary"
                )}
              >
                <div className="p-2 rounded-full group-hover:bg-primary/10 transition-colors">
                  <Heart className={cn("w-6 h-6", liked && "fill-current")} />
                </div>
              </button>

              <button
                onClick={() => setSaved(!saved)}
                className={cn(
                  "p-2 rounded-full transition-colors",
                  saved ? "text-primary" : "text-muted-foreground hover:text-primary hover:bg-primary/10"
                )}
              >
                <Bookmark className={cn("w-6 h-6", saved && "fill-current")} />
              </button>

              <button
                onClick={() => setShowShareDialog(true)}
                className="p-2 rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
              >
                <Share className="w-6 h-6" />
              </button>
            </div>
          </article>

          {/* Comments Section */}
          <CommentSection comments={comments} onAddComment={handleAddComment} />
        </main>

        <RightSidebar />
      </div>

      <MobileNav />
      <ThemeToggle />

      <ShareDialog
        open={showShareDialog}
        onOpenChange={setShowShareDialog}
        postContent={mockPost.content}
      />

      <RepostDialog
        open={showRepostDialog}
        onOpenChange={setShowRepostDialog}
        originalPost={mockPost}
      />
    </div>
  );
}
