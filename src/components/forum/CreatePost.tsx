import { Image, Smile, Hash, MapPin, Calendar } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";

export function CreatePost() {
  const [content, setContent] = useState("");

  return (
    <div className="bg-card border border-border rounded-2xl p-4">
      <div className="flex gap-3">
        <Avatar className="w-12 h-12 flex-shrink-0">
          <AvatarImage src="" />
          <AvatarFallback className="bg-primary/10 text-primary font-semibold">
            YU
          </AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's happening in the community?"
            className="w-full bg-transparent text-foreground placeholder:text-muted-foreground text-lg resize-none focus:outline-none min-h-[80px]"
            rows={3}
          />

          <div className="flex items-center justify-between pt-3 border-t border-border mt-3">
            <div className="flex items-center gap-1">
              <button className="p-2 rounded-full hover:bg-primary/10 text-primary transition-colors">
                <Image className="w-5 h-5" />
              </button>
              <button className="p-2 rounded-full hover:bg-primary/10 text-primary transition-colors">
                <Smile className="w-5 h-5" />
              </button>
              <button className="p-2 rounded-full hover:bg-primary/10 text-primary transition-colors">
                <Hash className="w-5 h-5" />
              </button>
              <button className="p-2 rounded-full hover:bg-primary/10 text-primary transition-colors">
                <MapPin className="w-5 h-5" />
              </button>
              <button className="p-2 rounded-full hover:bg-primary/10 text-primary transition-colors">
                <Calendar className="w-5 h-5" />
              </button>
            </div>

            <button
              disabled={!content.trim()}
              className="bg-primary text-primary-foreground font-semibold px-5 py-2 rounded-full hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
