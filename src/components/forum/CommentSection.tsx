import { Heart, MessageCircle, MoreHorizontal } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface Comment {
  id: number;
  author: {
    name: string;
    handle: string;
    avatar: string;
    verified?: boolean;
  };
  content: string;
  timestamp: string;
  likes: number;
  replies?: Comment[];
}

interface CommentSectionProps {
  comments: Comment[];
  onAddComment?: (content: string) => void;
}

function CommentItem({ comment, depth = 0 }: { comment: Comment; depth?: number }) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(comment.likes);
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyContent, setReplyContent] = useState("");

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  return (
    <div className={cn("py-3", depth > 0 && "ml-12 border-l-2 border-border pl-4")}>
      <div className="flex gap-3">
        <Avatar className="w-10 h-10 flex-shrink-0">
          <AvatarImage src="" />
          <AvatarFallback className="bg-primary/10 text-primary font-semibold text-sm">
            {comment.author.avatar}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="font-semibold text-foreground text-sm truncate">
                {comment.author.name}
              </span>
              {comment.author.verified && (
                <svg className="w-3.5 h-3.5 text-primary flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              )}
              <span className="text-muted-foreground text-sm truncate">{comment.author.handle}</span>
              <span className="text-muted-foreground text-sm">·</span>
              <span className="text-muted-foreground text-sm flex-shrink-0">{comment.timestamp}</span>
            </div>
            <button className="p-1 rounded-full hover:bg-secondary text-muted-foreground transition-colors">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>

          <p className="text-foreground text-sm mt-1">{comment.content}</p>

          <div className="flex items-center gap-4 mt-2 -ml-2">
            <button
              onClick={() => setShowReplyInput(!showReplyInput)}
              className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors group"
            >
              <div className="p-1.5 rounded-full group-hover:bg-primary/10 transition-colors">
                <MessageCircle className="w-4 h-4" />
              </div>
              <span className="text-xs">Reply</span>
            </button>

            <button
              onClick={handleLike}
              className={cn(
                "flex items-center gap-1 transition-colors group",
                liked ? "text-primary" : "text-muted-foreground hover:text-primary"
              )}
            >
              <div className="p-1.5 rounded-full group-hover:bg-primary/10 transition-colors">
                <Heart className={cn("w-4 h-4", liked && "fill-current")} />
              </div>
              <span className="text-xs">{likeCount}</span>
            </button>
          </div>

          {showReplyInput && (
            <div className="flex gap-2 mt-3">
              <Avatar className="w-8 h-8 flex-shrink-0">
                <AvatarFallback className="bg-primary/10 text-primary font-semibold text-xs">
                  YU
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 flex gap-2">
                <input
                  type="text"
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  placeholder="Write a reply..."
                  className="flex-1 bg-secondary text-foreground placeholder:text-muted-foreground text-sm rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                <button
                  disabled={!replyContent.trim()}
                  className="bg-primary text-primary-foreground font-medium px-4 py-2 rounded-full text-sm hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Reply
                </button>
              </div>
            </div>
          )}

          {comment.replies && comment.replies.length > 0 && (
            <div className="mt-2">
              {comment.replies.map((reply) => (
                <CommentItem key={reply.id} comment={reply} depth={depth + 1} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function CommentSection({ comments, onAddComment }: CommentSectionProps) {
  const [newComment, setNewComment] = useState("");

  const handleSubmit = () => {
    if (newComment.trim() && onAddComment) {
      onAddComment(newComment);
      setNewComment("");
    }
  };

  return (
    <div className="border-t border-border">
      {/* Add Comment */}
      <div className="p-4 border-b border-border">
        <div className="flex gap-3">
          <Avatar className="w-10 h-10 flex-shrink-0">
            <AvatarImage src="" />
            <AvatarFallback className="bg-primary/10 text-primary font-semibold text-sm">
              YU
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 flex gap-2">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              className="flex-1 bg-secondary text-foreground placeholder:text-muted-foreground rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <button
              onClick={handleSubmit}
              disabled={!newComment.trim()}
              className="bg-primary text-primary-foreground font-semibold px-5 py-2 rounded-full hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Reply
            </button>
          </div>
        </div>
      </div>

      {/* Comments List */}
      <div className="divide-y divide-border">
        {comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>

      {comments.length === 0 && (
        <div className="p-8 text-center text-muted-foreground">
          <MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>No comments yet. Be the first to comment!</p>
        </div>
      )}
    </div>
  );
}
