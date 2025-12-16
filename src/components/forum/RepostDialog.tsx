import { Repeat2, Quote } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

interface RepostDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  originalPost?: {
    author: {
      name: string;
      handle: string;
      avatar: string;
    };
    content: string;
  };
}

export function RepostDialog({ open, onOpenChange, originalPost }: RepostDialogProps) {
  const [quoteContent, setQuoteContent] = useState("");
  const [showQuoteInput, setShowQuoteInput] = useState(false);

  const handleRepost = () => {
    toast({
      title: "Reposted!",
      description: "The post has been shared to your timeline.",
    });
    onOpenChange(false);
  };

  const handleQuotePost = () => {
    if (quoteContent.trim()) {
      toast({
        title: "Quote posted!",
        description: "Your quote has been shared.",
      });
      setQuoteContent("");
      setShowQuoteInput(false);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Repost</DialogTitle>
        </DialogHeader>
        
        {!showQuoteInput ? (
          <div className="space-y-2 py-4">
            <button
              onClick={handleRepost}
              className="w-full flex items-center gap-3 p-4 rounded-xl hover:bg-secondary transition-colors text-left"
            >
              <div className="p-2 rounded-full bg-green-500/10 text-green-500">
                <Repeat2 className="w-5 h-5" />
              </div>
              <div>
                <p className="font-medium text-foreground">Repost</p>
                <p className="text-sm text-muted-foreground">Share this post instantly</p>
              </div>
            </button>
            
            <button
              onClick={() => setShowQuoteInput(true)}
              className="w-full flex items-center gap-3 p-4 rounded-xl hover:bg-secondary transition-colors text-left"
            >
              <div className="p-2 rounded-full bg-primary/10 text-primary">
                <Quote className="w-5 h-5" />
              </div>
              <div>
                <p className="font-medium text-foreground">Quote</p>
                <p className="text-sm text-muted-foreground">Add your thoughts to this post</p>
              </div>
            </button>
          </div>
        ) : (
          <div className="py-4 space-y-4">
            <div className="flex gap-3">
              <Avatar className="w-10 h-10 flex-shrink-0">
                <AvatarImage src="" />
                <AvatarFallback className="bg-primary/10 text-primary font-semibold text-sm">
                  YU
                </AvatarFallback>
              </Avatar>
              <textarea
                value={quoteContent}
                onChange={(e) => setQuoteContent(e.target.value)}
                placeholder="Add your thoughts..."
                className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground resize-none focus:outline-none min-h-[80px]"
                rows={3}
              />
            </div>

            {originalPost && (
              <div className="border border-border rounded-xl p-3 bg-secondary/50">
                <div className="flex items-center gap-2 mb-2">
                  <Avatar className="w-6 h-6">
                    <AvatarFallback className="bg-primary/10 text-primary text-xs">
                      {originalPost.author.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium text-sm text-foreground">{originalPost.author.name}</span>
                  <span className="text-muted-foreground text-sm">{originalPost.author.handle}</span>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">{originalPost.content}</p>
              </div>
            )}

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowQuoteInput(false)}
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleQuotePost}
                disabled={!quoteContent.trim()}
                className="bg-primary text-primary-foreground font-semibold px-5 py-2 rounded-full text-sm hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Quote
              </button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
