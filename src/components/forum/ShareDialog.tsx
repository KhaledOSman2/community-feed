import { X, Link2, Twitter, Facebook, Mail, MessageCircle, Copy, Check } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

interface ShareDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  postUrl?: string;
  postContent?: string;
}

export function ShareDialog({ open, onOpenChange, postUrl = window.location.href, postContent = "" }: ShareDialogProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(postUrl);
      setCopied(true);
      toast({
        title: "Link copied!",
        description: "The link has been copied to your clipboard.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({
        title: "Failed to copy",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  const shareOptions = [
    {
      name: "Copy Link",
      icon: copied ? Check : Link2,
      onClick: handleCopyLink,
      color: "text-primary",
    },
    {
      name: "Twitter / X",
      icon: Twitter,
      onClick: () => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(postUrl)}&text=${encodeURIComponent(postContent)}`, "_blank"),
      color: "text-foreground",
    },
    {
      name: "Facebook",
      icon: Facebook,
      onClick: () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`, "_blank"),
      color: "text-blue-600",
    },
    {
      name: "WhatsApp",
      icon: MessageCircle,
      onClick: () => window.open(`https://wa.me/?text=${encodeURIComponent(postContent + " " + postUrl)}`, "_blank"),
      color: "text-green-500",
    },
    {
      name: "Email",
      icon: Mail,
      onClick: () => window.open(`mailto:?subject=Check this out&body=${encodeURIComponent(postContent + "\n\n" + postUrl)}`, "_blank"),
      color: "text-muted-foreground",
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Post</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-3 gap-4 py-4">
          {shareOptions.map((option) => (
            <button
              key={option.name}
              onClick={option.onClick}
              className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-secondary transition-colors"
            >
              <div className={`p-3 rounded-full bg-secondary ${option.color}`}>
                <option.icon className="w-6 h-6" />
              </div>
              <span className="text-sm text-foreground">{option.name}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 p-3 bg-secondary rounded-xl">
          <input
            type="text"
            value={postUrl}
            readOnly
            className="flex-1 bg-transparent text-sm text-foreground focus:outline-none truncate"
          />
          <button
            onClick={handleCopyLink}
            className="p-2 rounded-lg hover:bg-background transition-colors"
          >
            {copied ? (
              <Check className="w-5 h-5 text-green-500" />
            ) : (
              <Copy className="w-5 h-5 text-muted-foreground" />
            )}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
