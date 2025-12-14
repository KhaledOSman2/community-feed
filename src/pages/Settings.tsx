import { LeftSidebar } from "@/components/forum/LeftSidebar";
import { MobileNav } from "@/components/forum/MobileNav";
import { ThemeToggle } from "@/components/forum/ThemeToggle";
import { ArrowLeft, User, Bell, Shield, Palette, Globe, HelpCircle, LogOut, ChevronRight, Moon, Sun, Eye, EyeOff, Lock, Mail, Smartphone } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

type SettingsSection = "account" | "notifications" | "privacy" | "appearance" | "language" | "help";

const Settings = () => {
  const [activeSection, setActiveSection] = useState<SettingsSection>("account");
  const [isDark, setIsDark] = useState(false);

  // Notification settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [mentionNotifications, setMentionNotifications] = useState(true);
  const [followerNotifications, setFollowerNotifications] = useState(true);

  // Privacy settings
  const [privateAccount, setPrivateAccount] = useState(false);
  const [showOnlineStatus, setShowOnlineStatus] = useState(true);
  const [allowDMs, setAllowDMs] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    if (newTheme) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const menuItems = [
    { id: "account", label: "Account", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "privacy", label: "Privacy & Security", icon: Shield },
    { id: "appearance", label: "Appearance", icon: Palette },
    { id: "language", label: "Language", icon: Globe },
    { id: "help", label: "Help & Support", icon: HelpCircle },
  ];

  return (
    <div className="min-h-screen bg-background">
      <ThemeToggle />
      
      <div className="flex w-full max-w-7xl mx-auto">
        <LeftSidebar />
        
        <main className="flex-1 min-h-screen border-x border-border">
          {/* Header */}
          <div className="sticky top-0 bg-background/80 backdrop-blur-md border-b border-border p-4 z-10 flex items-center gap-4">
            <Link to="/profile" className="p-2 hover:bg-secondary rounded-full transition-colors">
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </Link>
            <h1 className="text-xl font-bold text-foreground">Settings</h1>
          </div>

          <div className="flex">
            {/* Settings Menu */}
            <div className="w-64 border-r border-border p-4 hidden md:block">
              <nav className="space-y-1">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id as SettingsSection)}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors",
                      activeSection === item.id
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    )}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </button>
                ))}
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-red-500 hover:bg-red-500/10 transition-colors mt-4">
                  <LogOut className="w-5 h-5" />
                  <span>Log Out</span>
                </button>
              </nav>
            </div>

            {/* Mobile Menu */}
            <div className="md:hidden w-full p-4 border-b border-border">
              <select
                value={activeSection}
                onChange={(e) => setActiveSection(e.target.value as SettingsSection)}
                className="w-full bg-secondary text-foreground p-3 rounded-xl border-0 focus:ring-2 focus:ring-primary"
              >
                {menuItems.map((item) => (
                  <option key={item.id} value={item.id}>{item.label}</option>
                ))}
              </select>
            </div>

            {/* Settings Content */}
            <div className="flex-1 p-6">
              {activeSection === "account" && (
                <div className="space-y-6">
                  <h2 className="text-lg font-semibold text-foreground">Account Settings</h2>
                  
                  {/* Profile Section */}
                  <div className="bg-card border border-border rounded-2xl p-5">
                    <div className="flex items-center gap-4 mb-6">
                      <Avatar className="w-20 h-20">
                        <AvatarImage src="" />
                        <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-bold">JD</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-foreground">John Doe</h3>
                        <p className="text-muted-foreground text-sm">@johndoe</p>
                        <button className="text-primary text-sm font-medium mt-2 hover:underline">
                          Change profile photo
                        </button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-foreground block mb-2">Display Name</label>
                        <input
                          type="text"
                          defaultValue="John Doe"
                          className="w-full bg-secondary text-foreground px-4 py-3 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground block mb-2">Username</label>
                        <input
                          type="text"
                          defaultValue="johndoe"
                          className="w-full bg-secondary text-foreground px-4 py-3 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground block mb-2">Bio</label>
                        <textarea
                          rows={3}
                          defaultValue="Full-stack developer passionate about building amazing web experiences."
                          className="w-full bg-secondary text-foreground px-4 py-3 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                        />
                      </div>
                      <button className="bg-primary text-primary-foreground px-6 py-2 rounded-xl font-medium hover:opacity-90 transition-opacity">
                        Save Changes
                      </button>
                    </div>
                  </div>

                  {/* Email & Password */}
                  <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
                    <h3 className="font-semibold text-foreground">Email & Password</h3>
                    <div className="flex items-center justify-between py-3 border-b border-border">
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <p className="text-foreground">Email address</p>
                          <p className="text-sm text-muted-foreground">john@example.com</p>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div className="flex items-center justify-between py-3">
                      <div className="flex items-center gap-3">
                        <Lock className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <p className="text-foreground">Password</p>
                          <p className="text-sm text-muted-foreground">Last changed 3 months ago</p>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    </div>
                  </div>
                </div>
              )}

              {activeSection === "notifications" && (
                <div className="space-y-6">
                  <h2 className="text-lg font-semibold text-foreground">Notification Preferences</h2>
                  
                  <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
                    <div className="flex items-center justify-between py-3">
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <p className="text-foreground">Email notifications</p>
                          <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                        </div>
                      </div>
                      <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
                    </div>
                    <div className="flex items-center justify-between py-3 border-t border-border">
                      <div className="flex items-center gap-3">
                        <Smartphone className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <p className="text-foreground">Push notifications</p>
                          <p className="text-sm text-muted-foreground">Receive push notifications on your device</p>
                        </div>
                      </div>
                      <Switch checked={pushNotifications} onCheckedChange={setPushNotifications} />
                    </div>
                    <div className="flex items-center justify-between py-3 border-t border-border">
                      <div className="flex items-center gap-3">
                        <Bell className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <p className="text-foreground">Mentions</p>
                          <p className="text-sm text-muted-foreground">Notify when someone mentions you</p>
                        </div>
                      </div>
                      <Switch checked={mentionNotifications} onCheckedChange={setMentionNotifications} />
                    </div>
                    <div className="flex items-center justify-between py-3 border-t border-border">
                      <div className="flex items-center gap-3">
                        <User className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <p className="text-foreground">New followers</p>
                          <p className="text-sm text-muted-foreground">Notify when someone follows you</p>
                        </div>
                      </div>
                      <Switch checked={followerNotifications} onCheckedChange={setFollowerNotifications} />
                    </div>
                  </div>
                </div>
              )}

              {activeSection === "privacy" && (
                <div className="space-y-6">
                  <h2 className="text-lg font-semibold text-foreground">Privacy & Security</h2>
                  
                  <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
                    <div className="flex items-center justify-between py-3">
                      <div className="flex items-center gap-3">
                        <Lock className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <p className="text-foreground">Private account</p>
                          <p className="text-sm text-muted-foreground">Only approved followers can see your posts</p>
                        </div>
                      </div>
                      <Switch checked={privateAccount} onCheckedChange={setPrivateAccount} />
                    </div>
                    <div className="flex items-center justify-between py-3 border-t border-border">
                      <div className="flex items-center gap-3">
                        {showOnlineStatus ? <Eye className="w-5 h-5 text-muted-foreground" /> : <EyeOff className="w-5 h-5 text-muted-foreground" />}
                        <div>
                          <p className="text-foreground">Show online status</p>
                          <p className="text-sm text-muted-foreground">Let others see when you're online</p>
                        </div>
                      </div>
                      <Switch checked={showOnlineStatus} onCheckedChange={setShowOnlineStatus} />
                    </div>
                    <div className="flex items-center justify-between py-3 border-t border-border">
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <p className="text-foreground">Allow direct messages</p>
                          <p className="text-sm text-muted-foreground">Let anyone send you direct messages</p>
                        </div>
                      </div>
                      <Switch checked={allowDMs} onCheckedChange={setAllowDMs} />
                    </div>
                  </div>

                  <div className="bg-card border border-border rounded-2xl p-5">
                    <h3 className="font-semibold text-foreground mb-4">Two-factor authentication</h3>
                    <p className="text-muted-foreground text-sm mb-4">Add an extra layer of security to your account</p>
                    <button className="bg-primary text-primary-foreground px-6 py-2 rounded-xl font-medium hover:opacity-90 transition-opacity">
                      Enable 2FA
                    </button>
                  </div>
                </div>
              )}

              {activeSection === "appearance" && (
                <div className="space-y-6">
                  <h2 className="text-lg font-semibold text-foreground">Appearance</h2>
                  
                  <div className="bg-card border border-border rounded-2xl p-5">
                    <h3 className="font-semibold text-foreground mb-4">Theme</h3>
                    <div className="flex gap-4">
                      <button
                        onClick={() => { if (isDark) toggleTheme(); }}
                        className={cn(
                          "flex-1 p-4 rounded-xl border-2 transition-colors flex flex-col items-center gap-2",
                          !isDark ? "border-primary bg-primary/10" : "border-border hover:border-muted-foreground"
                        )}
                      >
                        <Sun className="w-8 h-8 text-yellow-500" />
                        <span className="font-medium text-foreground">Light</span>
                      </button>
                      <button
                        onClick={() => { if (!isDark) toggleTheme(); }}
                        className={cn(
                          "flex-1 p-4 rounded-xl border-2 transition-colors flex flex-col items-center gap-2",
                          isDark ? "border-primary bg-primary/10" : "border-border hover:border-muted-foreground"
                        )}
                      >
                        <Moon className="w-8 h-8 text-blue-500" />
                        <span className="font-medium text-foreground">Dark</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === "language" && (
                <div className="space-y-6">
                  <h2 className="text-lg font-semibold text-foreground">Language</h2>
                  
                  <div className="bg-card border border-border rounded-2xl p-5">
                    <label className="text-sm font-medium text-foreground block mb-2">Select language</label>
                    <select className="w-full bg-secondary text-foreground p-3 rounded-xl border-0 focus:ring-2 focus:ring-primary">
                      <option value="en">English</option>
                      <option value="ar">العربية</option>
                      <option value="es">Español</option>
                      <option value="fr">Français</option>
                      <option value="de">Deutsch</option>
                      <option value="zh">中文</option>
                      <option value="ja">日本語</option>
                    </select>
                  </div>
                </div>
              )}

              {activeSection === "help" && (
                <div className="space-y-6">
                  <h2 className="text-lg font-semibold text-foreground">Help & Support</h2>
                  
                  <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
                    <button className="w-full flex items-center justify-between py-3 hover:bg-secondary px-3 -mx-3 rounded-lg transition-colors">
                      <span className="text-foreground">Help Center</span>
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    </button>
                    <button className="w-full flex items-center justify-between py-3 hover:bg-secondary px-3 -mx-3 rounded-lg transition-colors border-t border-border">
                      <span className="text-foreground">Contact Support</span>
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    </button>
                    <button className="w-full flex items-center justify-between py-3 hover:bg-secondary px-3 -mx-3 rounded-lg transition-colors border-t border-border">
                      <span className="text-foreground">Terms of Service</span>
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    </button>
                    <button className="w-full flex items-center justify-between py-3 hover:bg-secondary px-3 -mx-3 rounded-lg transition-colors border-t border-border">
                      <span className="text-foreground">Privacy Policy</span>
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    </button>
                  </div>

                  <div className="text-center text-muted-foreground text-sm">
                    <p>App Version 1.0.0</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      <MobileNav />
      <div className="h-20 lg:hidden" />
    </div>
  );
};

export default Settings;
