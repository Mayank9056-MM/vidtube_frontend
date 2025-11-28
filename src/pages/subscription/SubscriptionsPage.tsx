import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Bell,
  BellOff,
  Search,
  Play,
  Eye,
  ThumbsUp,
  Grid3x3,
  List,
  ChevronRight,
  CheckCircle,
  Clock,
} from "lucide-react";

// Mock data for subscriptions
const mockSubscriptions = [
  {
    id: 1,
    channelName: "Tech Insights",
    channelAvatar: "TI",
    subscribers: "2.5M",
    isVerified: true,
    notificationsOn: true,
    description: "Latest technology reviews and insights",
    coverImage: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  },
  {
    id: 2,
    channelName: "Cooking Masters",
    channelAvatar: "CM",
    subscribers: "1.8M",
    isVerified: true,
    notificationsOn: false,
    description: "Delicious recipes from around the world",
    coverImage: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  },
  {
    id: 3,
    channelName: "Fitness Journey",
    channelAvatar: "FJ",
    subscribers: "980K",
    isVerified: false,
    notificationsOn: true,
    description: "Transform your body and mind",
    coverImage: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  },
  {
    id: 4,
    channelName: "Gaming Universe",
    channelAvatar: "GU",
    subscribers: "3.2M",
    isVerified: true,
    notificationsOn: true,
    description: "Epic gameplay and gaming news",
    coverImage: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
  },
  {
    id: 5,
    channelName: "Travel Diaries",
    channelAvatar: "TD",
    subscribers: "1.2M",
    isVerified: true,
    notificationsOn: false,
    description: "Explore the world with us",
    coverImage: "linear-gradient(135deg, #30cfd0 0%, #330867 100%)",
  },
  {
    id: 6,
    channelName: "Music Vibes",
    channelAvatar: "MV",
    subscribers: "5.1M",
    isVerified: true,
    notificationsOn: true,
    description: "The best music and covers",
    coverImage: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
  },
];

// Mock videos for selected channel
const mockVideos = [
  {
    id: 1,
    title: "Getting Started with React Hooks in 2024",
    thumbnail: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    duration: "15:24",
    views: "234K",
    uploadedAt: "2 days ago",
    likes: "12K",
  },
  {
    id: 2,
    title: "Top 10 JavaScript Tips Every Developer Should Know",
    thumbnail: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    duration: "22:18",
    views: "456K",
    uploadedAt: "1 week ago",
    likes: "28K",
  },
  {
    id: 3,
    title: "Building a Full-Stack App with Next.js",
    thumbnail: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    duration: "45:32",
    views: "892K",
    uploadedAt: "2 weeks ago",
    likes: "45K",
  },
  {
    id: 4,
    title: "CSS Grid vs Flexbox: When to Use What",
    thumbnail: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    duration: "18:45",
    views: "178K",
    uploadedAt: "3 weeks ago",
    likes: "9K",
  },
  {
    id: 5,
    title: "Advanced TypeScript Patterns and Best Practices",
    thumbnail: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    duration: "32:10",
    views: "567K",
    uploadedAt: "1 month ago",
    likes: "34K",
  },
  {
    id: 6,
    title: "Deploying Your App to Production - Complete Guide",
    thumbnail: "linear-gradient(135deg, #30cfd0 0%, #330867 100%)",
    duration: "28:55",
    views: "321K",
    uploadedAt: "1 month ago",
    likes: "18K",
  },
];

export default function SubscriptionsPage() {
  const [theme] = useState("dark");
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [subscriptions, setSubscriptions] = useState(mockSubscriptions);

  const toggleNotifications = (channelId) => {
    setSubscriptions(
      subscriptions.map((sub) =>
        sub.id === channelId
          ? { ...sub, notificationsOn: !sub.notificationsOn }
          : sub
      )
    );
  };

  const filteredSubscriptions = subscriptions.filter((sub) =>
    sub.channelName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-red-50 dark:from-black dark:via-gray-950 dark:to-red-950/20 transition-colors duration-500">
        {/* Header */}
        <div className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 512 512"
                  className="drop-shadow-lg"
                >
                  <defs>
                    <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
                      <stop offset="0" stopColor="#ff3b30" />
                      <stop offset="1" stopColor="#c0122a" />
                    </linearGradient>
                  </defs>
                  <rect
                    x="24"
                    y="24"
                    width="464"
                    height="464"
                    rx="88"
                    fill="url(#g)"
                  />
                  <g transform="translate(140,124) scale(0.9)">
                    <path
                      d="M86 36.5C92.1 40 96 46.9 96 54.7V213.3C96 221.1 92.1 228 86 231.5C78.9 235 69.7 232.6 63.9 226.8L13.8 176.7C8.0 170.9 8.0 160.1 13.8 154.3L63.9 104.2C69.7 98.4 78.9 96 86 99.5Z"
                      fill="#ffffff"
                    />
                  </g>
                </svg>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-red-600 via-red-500 to-red-700 dark:from-red-500 dark:via-red-400 dark:to-red-600 bg-clip-text text-transparent">
                    My Subscriptions
                  </h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {subscriptions.length} channels
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
                  className="text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400"
                >
                  {viewMode === "grid" ? <List className="w-5 h-5" /> : <Grid3x3 className="w-5 h-5" />}
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Sidebar - Subscriptions List */}
            <div className="lg:col-span-4 xl:col-span-3">
              <Card className="sticky top-24 shadow-xl border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-gray-900 dark:text-white">
                    All Channels
                  </CardTitle>
                  <div className="relative mt-2">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="Search channels..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-gray-50 dark:bg-gray-950 border-gray-300 dark:border-gray-700 focus:border-red-500 dark:focus:border-red-500"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="max-h-[calc(100vh-280px)] overflow-y-auto">
                    {filteredSubscriptions.map((sub) => (
                      <button
                        key={sub.id}
                        onClick={() => setSelectedChannel(sub)}
                        className={`w-full flex items-center gap-3 p-4 hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors border-l-4 ${
                          selectedChannel?.id === sub.id
                            ? "border-red-600 bg-red-50 dark:bg-red-950/20"
                            : "border-transparent"
                        }`}
                      >
                        <div
                          className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg"
                          style={{ background: sub.coverImage }}
                        >
                          {sub.channelAvatar}
                        </div>
                        <div className="flex-1 text-left">
                          <div className="flex items-center gap-1">
                            <p className="font-semibold text-gray-900 dark:text-white text-sm truncate">
                              {sub.channelName}
                            </p>
                            {sub.isVerified && (
                              <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0" />
                            )}
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {sub.subscribers} subscribers
                          </p>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleNotifications(sub.id);
                          }}
                          className="p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        >
                          {sub.notificationsOn ? (
                            <Bell className="w-4 h-4 text-red-600 dark:text-red-400" />
                          ) : (
                            <BellOff className="w-4 h-4 text-gray-400" />
                          )}
                        </button>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content - Channel Profile & Videos */}
            <div className="lg:col-span-8 xl:col-span-9">
              {selectedChannel ? (
                <div className="space-y-6">
                  {/* Channel Header */}
                  <Card className="overflow-hidden shadow-xl border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl">
                    <div
                      className="h-32 sm:h-48"
                      style={{ background: selectedChannel.coverImage }}
                    />
                    <CardContent className="pt-6">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        <div
                          className="w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center text-white font-bold text-3xl shadow-xl -mt-16 sm:-mt-20 border-4 border-white dark:border-gray-900"
                          style={{ background: selectedChannel.coverImage }}
                        >
                          {selectedChannel.channelAvatar}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                              {selectedChannel.channelName}
                            </h2>
                            {selectedChannel.isVerified && (
                              <CheckCircle className="w-6 h-6 text-blue-500" />
                            )}
                          </div>
                          <p className="text-gray-600 dark:text-gray-400 mb-2">
                            {selectedChannel.subscribers} subscribers
                          </p>
                          <p className="text-gray-700 dark:text-gray-300 text-sm">
                            {selectedChannel.description}
                          </p>
                        </div>
                        <Button
                          className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 dark:from-red-500 dark:to-red-600 text-white shadow-lg"
                        >
                          {selectedChannel.notificationsOn ? (
                            <Bell className="w-4 h-4 mr-2" />
                          ) : (
                            <BellOff className="w-4 h-4 mr-2" />
                          )}
                          {selectedChannel.notificationsOn ? "All" : "None"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Videos Section */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        Latest Videos
                      </h3>
                      <button className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium text-sm flex items-center gap-1">
                        View All
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>

                    <div
                      className={`grid gap-4 ${
                        viewMode === "grid"
                          ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
                          : "grid-cols-1"
                      }`}
                    >
                      {mockVideos.map((video) => (
                        <Card
                          key={video.id}
                          className="group overflow-hidden shadow-lg border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                        >
                          <div className="relative">
                            <div
                              className="aspect-video w-full"
                              style={{ background: video.thumbnail }}
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center shadow-2xl">
                                <Play className="w-8 h-8 text-white ml-1" />
                              </div>
                            </div>
                            <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/80 text-white text-xs font-semibold rounded">
                              {video.duration}
                            </div>
                          </div>
                          <CardContent className="p-4">
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                              {video.title}
                            </h4>
                            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                              <div className="flex items-center gap-1">
                                <Eye className="w-4 h-4" />
                                {video.views}
                              </div>
                              <div className="flex items-center gap-1">
                                <ThumbsUp className="w-4 h-4" />
                                {video.likes}
                              </div>
                            </div>
                            <div className="flex items-center gap-1 mt-2 text-xs text-gray-500 dark:text-gray-500">
                              <Clock className="w-3 h-3" />
                              {video.uploadedAt}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Card className="shadow-xl border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl">
                  <CardContent className="flex flex-col items-center justify-center py-20 px-4">
                    <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-red-700 dark:from-red-600 dark:to-red-800 rounded-full flex items-center justify-center shadow-2xl shadow-red-500/50 dark:shadow-red-900/50 mb-6">
                      <Play className="w-12 h-12 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      Select a Channel
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-center max-w-md">
                      Choose a channel from the sidebar to view their profile and latest videos
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}