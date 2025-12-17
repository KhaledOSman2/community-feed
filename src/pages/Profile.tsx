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
  name: "أحمد محمد",
  username: "ahmed_dev",
  handle: "@ahmed_dev",
  avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  coverImage: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=1200&h=400&fit=crop",
  bio: "مطور ويب متكامل | شغوف ببناء تجارب رقمية مذهلة | مساهم في المصادر المفتوحة ☕",
  location: "الرياض، السعودية",
  website: "ahmeddev.com",
  joinDate: "مارس 2023",
  verified: true,
};

const userPosts = [
  {
    id: 1,
    author: {
      name: "أحمد محمد",
      handle: "@ahmed_dev",
      avatar: "أم",
      avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      verified: true,
    },
    content: "أطلقت للتو ميزة جديدة كنت أعمل عليها لأسابيع! شعور رائع أن ترى كودك يعمل بشكل مثالي 🚀\n\nما الذي تعملون عليه اليوم؟",
    stats: { likes: 234, comments: 45, reposts: 12 },
    timestamp: "منذ ساعتين",
    tags: ["برمجة", "تطوير_ويب"],
  },
  {
    id: 2,
    author: {
      name: "أحمد محمد",
      handle: "@ahmed_dev",
      avatar: "أم",
      avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      verified: true,
    },
    content: "TypeScript جعلني مطور JavaScript أفضل. الأمان في الأنواع ليس فقط لاكتشاف الأخطاء - إنه يساعدك على التفكير بوضوح في هياكل البيانات.",
    stats: { likes: 567, comments: 89, reposts: 45 },
    timestamp: "منذ يوم",
    tags: ["typescript", "javascript"],
  },
  {
    id: 3,
    author: {
      name: "أحمد محمد",
      handle: "@ahmed_dev",
      avatar: "أم",
      avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      verified: true,
    },
    content: "التعلم بشكل علني كان من أفضل القرارات التي اتخذتها لمسيرتي المهنية. لا تخف من مشاركة رحلتك - حتى الأخطاء!",
    stats: { likes: 892, comments: 124, reposts: 78 },
    timestamp: "منذ 3 أيام",
    tags: ["مسيرة_مهنية", "تعلم"],
  },
  {
    id: 4,
    author: {
      name: "أحمد محمد",
      handle: "@ahmed_dev",
      avatar: "أم",
      avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      verified: true,
    },
    content: "نصيحة للمطورين الجدد: ابدأ بمشاريع صغيرة وقم ببنائها بالكامل. التعلم من خلال البناء أفضل من مشاهدة الدروس فقط! 💪",
    stats: { likes: 1234, comments: 156, reposts: 89 },
    timestamp: "منذ أسبوع",
    tags: ["نصائح", "برمجة"],
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
              <p className="text-sm text-muted-foreground">{userPosts.length} منشور</p>
            </div>
          </div>

          {/* Cover Image */}
          <div className="h-48 relative overflow-hidden">
            <img 
              src={userProfile.coverImage} 
              alt="Cover" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
          </div>

          {/* Profile Info */}
          <div className="px-4 pb-4">
            <div className="flex justify-between items-start -mt-16 mb-4">
              <Avatar className="w-32 h-32 border-4 border-background shadow-lg">
                <AvatarImage src={userProfile.avatarUrl} alt={userProfile.name} />
                <AvatarFallback className="bg-primary text-primary-foreground text-4xl font-bold">
                  {userProfile.name.charAt(0)}
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
                      ? "border border-border text-foreground hover:border-destructive hover:text-destructive"
                      : "bg-primary text-primary-foreground hover:opacity-90"
                  }`}
                >
                  {isFollowing ? "متابَع" : "متابعة"}
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
                  انضم في {userProfile.joinDate}
                </span>
              </div>

              {/* Stats Section */}
              <div className="flex gap-6 py-3 border-y border-border">
                <div className="text-center">
                  <div className="text-xl font-bold text-foreground">{userPosts.length}</div>
                  <div className="text-sm text-muted-foreground">منشور</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-foreground">12.5K</div>
                  <div className="text-sm text-muted-foreground">متابِع</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-foreground">892</div>
                  <div className="text-sm text-muted-foreground">متابَع</div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-border">
            {[
              { id: "posts", label: "المنشورات" },
              { id: "replies", label: "الردود" },
              { id: "likes", label: "الإعجابات" },
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
