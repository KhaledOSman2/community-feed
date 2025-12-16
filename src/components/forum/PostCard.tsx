import { Heart, MessageCircle, Repeat2, Share, MoreHorizontal, Bookmark } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ShareDialog } from "./ShareDialog";
import { RepostDialog } from "./RepostDialog";

interface PostCardProps {
  author: {
    name: string;
    handle: string;
    avatar: string;
    verified?: boolean;
  };
  content: string;
  image?: string;
  tags?: string[];
  stats: {
    likes: number;
    comments: number;
    reposts: number;
  };
  timestamp: string;
  pinned?: boolean;
}

export function PostCard({ author, content, image, tags, stats, timestamp, pinned, id }: PostCardProps & { id?: number }) {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likeCount, setLikeCount] = useState(stats.likes);
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [showRepostDialog, setShowRepostDialog] = useState(false);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  const handlePostClick = () => {
    if (id) navigate(`/post/${id}`);
  };

  return (
    <>
      <article 
        onClick={handlePostClick}
        className="bg-card border border-border rounded-2xl p-4 hover:shadow-md transition-shadow cursor-pointer"
      >
        {pinned && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3 pl-12">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.293 2.293a1 1 0 011.414 0l7 7a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L3.707 10.707a1 1 0 01-1.414-1.414l7-7z" />
            </svg>
            <span>Pinned post</span>
          </div>
        )}
        
        <div className="flex gap-3">
          <Avatar className="w-12 h-12 flex-shrink-0">
            <AvatarImage src="" />
            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
              {author.avatar}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="font-semibold text-foreground truncate">{author.name}</span>
                {author.verified && (
                  <svg className="w-4 h-4 text-primary flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                )}
                <span className="text-muted-foreground truncate">{author.handle}</span>
                <span className="text-muted-foreground">·</span>
                <span className="text-muted-foreground text-sm flex-shrink-0">{timestamp}</span>
              </div>
              <button 
                onClick={(e) => e.stopPropagation()}
                className="p-1.5 rounded-full hover:bg-secondary text-muted-foreground transition-colors"
              >
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>

            <p className="text-foreground mt-2 whitespace-pre-wrap">{content}</p>

            {tags && tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    onClick={(e) => e.stopPropagation()}
                    className="text-primary hover:underline cursor-pointer text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {image && (
              <div className="mt-3 rounded-xl overflow-hidden border border-border">
                <img src={image} alt="Post attachment" className="w-full h-auto max-h-96 object-cover" />
              </div>
            )}

            <div className="flex items-center justify-between mt-4 -ml-2">
              <button 
                onClick={(e) => { e.stopPropagation(); if (id) navigate(`/post/${id}`); }}
                className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors group"
              >
                <div className="p-2 rounded-full group-hover:bg-primary/10 transition-colors">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <span className="text-sm">{stats.comments}</span>
              </button>

              <button 
                onClick={(e) => { e.stopPropagation(); setShowRepostDialog(true); }}
                className="flex items-center gap-1.5 text-muted-foreground hover:text-green-500 transition-colors group"
              >
                <div className="p-2 rounded-full group-hover:bg-green-500/10 transition-colors">
                  <Repeat2 className="w-5 h-5" />
                </div>
                <span className="text-sm">{stats.reposts}</span>
              </button>

              <button
                onClick={handleLike}
                className={cn(
                  "flex items-center gap-1.5 transition-colors group",
                  liked ? "text-primary" : "text-muted-foreground hover:text-primary"
                )}
              >
                <div className="p-2 rounded-full group-hover:bg-primary/10 transition-colors">
                  <Heart className={cn("w-5 h-5", liked && "fill-current")} />
                </div>
                <span className="text-sm">{likeCount}</span>
              </button>

              <div className="flex items-center gap-1">
                <button
                  onClick={(e) => { e.stopPropagation(); setSaved(!saved); }}
                  className={cn(
                    "p-2 rounded-full transition-colors",
                    saved ? "text-primary" : "text-muted-foreground hover:text-primary hover:bg-primary/10"
                  )}
                >
                  <Bookmark className={cn("w-5 h-5", saved && "fill-current")} />
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); setShowShareDialog(true); }}
                  className="p-2 rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                >
                  <Share className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </article>

      <ShareDialog
        open={showShareDialog}
        onOpenChange={setShowShareDialog}
        postContent={content}
      />

      <RepostDialog
        open={showRepostDialog}
        onOpenChange={setShowRepostDialog}
        originalPost={{ author, content }}
      />
    </>
  );
}
