import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Image, Smile, Hash, MapPin, Calendar, X, Upload } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

export default function NewPost() {
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const handleSubmit = () => {
    if (!content.trim()) return;
    
    toast({
      title: "تم نشر المنشور",
      description: "تم نشر منشورك بنجاح",
    });
    navigate("/");
  };

  const handleImageUpload = () => {
    // Mock image upload
    const mockImage = `https://picsum.photos/400/300?random=${Date.now()}`;
    setSelectedImages([...selectedImages, mockImage]);
  };

  const removeImage = (index: number) => {
    setSelectedImages(selectedImages.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 rounded-full hover:bg-muted transition-colors"
          >
            <ArrowRight className="w-5 h-5 text-foreground" />
          </button>
          
          <h1 className="text-lg font-bold text-foreground">منشور جديد</h1>
          
          <Button
            onClick={handleSubmit}
            disabled={!content.trim()}
            size="sm"
            className="rounded-full px-6"
          >
            نشر
          </Button>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-2xl mx-auto px-4 py-6">
        <div className="bg-card border border-border rounded-2xl p-6">
          {/* User Info */}
          <div className="flex gap-4 mb-6">
            <Avatar className="w-14 h-14 flex-shrink-0">
              <AvatarImage src="https://i.pravatar.cc/150?img=3" />
              <AvatarFallback className="bg-primary/10 text-primary font-semibold text-lg">
                أح
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-bold text-foreground">أحمد محمد</h3>
              <p className="text-sm text-muted-foreground">@ahmed_mohamed</p>
            </div>
          </div>

          {/* Title Input */}
          <div className="mb-4">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="عنوان المنشور (اختياري)"
              className="text-lg font-semibold border-0 border-b border-border rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary"
            />
          </div>

          {/* Content Textarea */}
          <div className="mb-6">
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="ماذا يدور في ذهنك؟ شارك أفكارك مع المجتمع..."
              className="min-h-[200px] text-lg border-0 px-0 resize-none focus-visible:ring-0"
              rows={8}
            />
          </div>

          {/* Selected Images Preview */}
          {selectedImages.length > 0 && (
            <div className="mb-6">
              <div className="grid grid-cols-2 gap-3">
                {selectedImages.map((img, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={img}
                      alt={`صورة ${index + 1}`}
                      className="w-full h-40 object-cover rounded-xl"
                    />
                    <button
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 p-1.5 bg-background/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-4 h-4 text-foreground" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Upload Area */}
          <div 
            onClick={handleImageUpload}
            className="mb-6 border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors"
          >
            <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">اضغط لإضافة صور أو فيديو</p>
            <p className="text-sm text-muted-foreground mt-1">PNG, JPG, GIF حتى 10MB</p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div className="flex items-center gap-1">
              <button 
                onClick={handleImageUpload}
                className="p-3 rounded-full hover:bg-primary/10 text-primary transition-colors"
              >
                <Image className="w-6 h-6" />
              </button>
              <button className="p-3 rounded-full hover:bg-primary/10 text-primary transition-colors">
                <Smile className="w-6 h-6" />
              </button>
              <button className="p-3 rounded-full hover:bg-primary/10 text-primary transition-colors">
                <Hash className="w-6 h-6" />
              </button>
              <button className="p-3 rounded-full hover:bg-primary/10 text-primary transition-colors">
                <MapPin className="w-6 h-6" />
              </button>
              <button className="p-3 rounded-full hover:bg-primary/10 text-primary transition-colors">
                <Calendar className="w-6 h-6" />
              </button>
            </div>

            <div className="text-sm text-muted-foreground">
              {content.length}/500
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-6 bg-muted/50 rounded-xl p-4">
          <h4 className="font-semibold text-foreground mb-2">نصائح للنشر</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• اكتب محتوى واضح ومفيد للمجتمع</li>
            <li>• أضف صور لجذب المزيد من التفاعل</li>
            <li>• استخدم الهاشتاقات للوصول لجمهور أوسع</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
