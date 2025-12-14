import { LeftSidebar } from "@/components/forum/LeftSidebar";
import { RightSidebar } from "@/components/forum/RightSidebar";
import { MobileNav } from "@/components/forum/MobileNav";
import { ThemeToggle } from "@/components/forum/ThemeToggle";
import { Bell, Heart, MessageCircle, UserPlus, Repeat2, AtSign, CheckCheck, Settings } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type NotificationType = "like" | "comment" | "follow" | "repost" | "mention";

interface Notification {
  id: number;
  type: NotificationType;
  user: { name: string; avatar: string; verified: boolean };
  content: string;
  time: string;
  read: boolean;
  postPreview?: string;
}

const notifications: Notification[] = [
  {
    id: 1,
    type: "like",
    user: { name: "Sarah Chen", avatar: "SC", verified: true },
    content: "liked your post",
    time: "2m ago",
    read: false,
    postPreview: "Just finished building an amazing new feature...",
  },
  {
    id: 2,
    type: "follow",
    user: { name: "Alex Rivera", avatar: "AR", verified: false },
    content: "started following you",
    time: "15m ago",
    read: false,
  },
  {
    id: 3,
    type: "comment",
    user: { name: "Mike Johnson", avatar: "MJ", verified: true },
    content: "commented on your post",
    time: "1h ago",
    read: false,
    postPreview: "Great insights! I totally agree with your perspective on...",
  },
  {
    id: 4,
    type: "repost",
    user: { name: "Emma Wilson", avatar: "EW", verified: true },
    content: "reposted your post",
    time: "2h ago",
    read: true,
    postPreview: "The future of web development is exciting!",
  },
  {
    id: 5,
    type: "mention",
    user: { name: "David Park", avatar: "DP", verified: false },
    content: "mentioned you in a post",
    time: "3h ago",
    read: true,
    postPreview: "Hey @you, check out this awesome project!",
  },
  {
    id: 6,
    type: "like",
    user: { name: "Lisa Wang", avatar: "LW", verified: true },
    content: "liked your comment",
    time: "5h ago",
    read: true,
  },
  {
    id: 7,
    type: "follow",
    user: { name: "Tom Harris", avatar: "TH", verified: false },
    content: "started following you",
    time: "1d ago",
    read: true,
  },
];

const getNotificationIcon = (type: NotificationType) => {
  switch (type) {
    case "like":
      return <Heart className="w-5 h-5 text-red-500 fill-red-500" />;
    case "comment":
      return <MessageCircle className="w-5 h-5 text-blue-500" />;
    case "follow":
      return <UserPlus className="w-5 h-5 text-green-500" />;
    case "repost":
      return <Repeat2 className="w-5 h-5 text-primary" />;
    case "mention":
      return <AtSign className="w-5 h-5 text-purple-500" />;
  }
};

const Notifications = () => {
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const [notificationsList, setNotificationsList] = useState(notifications);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const filteredNotifications = filter === "unread" 
    ? notificationsList.filter(n => !n.read) 
    : notificationsList;

  const unreadCount = notificationsList.filter(n => !n.read).length;

  const markAllAsRead = () => {
    setNotificationsList(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <div className="min-h-screen bg-background">
      <ThemeToggle />
      
      <div className="flex w-full max-w-7xl mx-auto">
        <LeftSidebar />
        
        <main className="flex-1 min-h-screen border-x border-border">
          {/* Header */}
          <div className="sticky top-0 bg-background/80 backdrop-blur-md border-b border-border p-4 z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <h1 className="text-xl font-bold text-foreground">Notifications</h1>
                {unreadCount > 0 && (
                  <span className="bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded-full">
                    {unreadCount}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="flex items-center gap-1 text-sm text-primary hover:opacity-80 transition-opacity"
                  >
                    <CheckCheck className="w-4 h-4" />
                    Mark all read
                  </button>
                )}
                <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
                  <Settings className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-2">
              <button
                onClick={() => setFilter("all")}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === "all"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-secondary"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter("unread")}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === "unread"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-secondary"
                }`}
              >
                Unread
              </button>
            </div>
          </div>

          {/* Notifications List */}
          <div className="divide-y divide-border">
            {filteredNotifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <Bell className="w-16 h-16 text-muted-foreground/50 mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No notifications</h3>
                <p className="text-muted-foreground">
                  {filter === "unread" ? "You're all caught up!" : "When you get notifications, they'll appear here."}
                </p>
              </div>
            ) : (
              filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={cn(
                    "flex items-start gap-4 p-4 hover:bg-secondary/50 transition-colors cursor-pointer",
                    !notification.read && "bg-primary/5"
                  )}
                >
                  <div className="relative">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-primary/10 text-primary font-medium">
                        {notification.user.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-background rounded-full flex items-center justify-center">
                      {getNotificationIcon(notification.type)}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-foreground">{notification.user.name}</span>
                      {notification.user.verified && (
                        <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      )}
                      <span className="text-muted-foreground">{notification.content}</span>
                    </div>
                    {notification.postPreview && (
                      <p className="text-muted-foreground text-sm mt-1 line-clamp-2">
                        {notification.postPreview}
                      </p>
                    )}
                    <p className="text-muted-foreground text-xs mt-2">{notification.time}</p>
                  </div>
                  {!notification.read && (
                    <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                  )}
                </div>
              ))
            )}
          </div>
        </main>
        
        <RightSidebar />
      </div>

      <MobileNav />
      <div className="h-20 lg:hidden" />
    </div>
  );
};

export default Notifications;
