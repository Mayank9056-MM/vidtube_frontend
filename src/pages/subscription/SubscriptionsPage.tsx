import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
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
  CheckCircle,
  Video,
  Users,
  TrendingUp,
  Calendar,
  Award,
  BarChart3,
} from "lucide-react";

// Mock videos data
const mockVideos = {
  1: [
    { id: 1, title: "Getting Started with React Hooks in 2024", thumbnail: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", duration: "15:24", views: "234K", uploadedAt: "2 days ago", likes: "12K" },
    { id: 2, title: "Top 10 JavaScript Tips Every Developer Should Know", thumbnail: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", duration: "22:18", views: "456K", uploadedAt: "1 week ago", likes: "28K" },
    { id: 3, title: "Building a Full-Stack App with Next.js", thumbnail: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", duration: "45:32", views: "892K", uploadedAt: "2 weeks ago", likes: "45K" },
    { id: 4, title: "CSS Grid vs Flexbox: When to Use What", thumbnail: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", duration: "18:45", views: "178K", uploadedAt: "3 weeks ago", likes: "9K" },
    { id: 5, title: "Advanced TypeScript Patterns", thumbnail: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", duration: "32:10", views: "567K", uploadedAt: "1 month ago", likes: "34K" },
    { id: 6, title: "Deploying Your App to Production", thumbnail: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", duration: "28:55", views: "321K", uploadedAt: "2 months ago", likes: "18K" },
  ],
  2: [
    { id: 7, title: "Perfect Pasta Carbonara Recipe", thumbnail: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)", duration: "12:30", views: "890K", uploadedAt: "1 day ago", likes: "45K" },
    { id: 8, title: "5 Easy Breakfast Ideas", thumbnail: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)", duration: "8:15", views: "1.2M", uploadedAt: "3 days ago", likes: "67K" },
    { id: 9, title: "Homemade Pizza From Scratch", thumbnail: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)", duration: "25:40", views: "2.1M", uploadedAt: "1 week ago", likes: "112K" },
  ],
  3: [
    { id: 10, title: "30 Day Fitness Challenge - Week 1", thumbnail: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)", duration: "15:20", views: "567K", uploadedAt: "2 days ago", likes: "34K" },
    { id: 11, title: "Full Body HIIT Workout", thumbnail: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)", duration: "20:30", views: "823K", uploadedAt: "5 days ago", likes: "51K" },
  ],
};

// Mock data for subscriptions with detailed stats
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
    totalVideos: 342,
    totalViews: "125M",
    avgViews: "365K",
    joinedDate: "Jan 2019",
    uploadFrequency: "3 videos/week",
    engagement: "8.5%",
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
    totalVideos: 456,
    totalViews: "89M",
    avgViews: "195K",
    joinedDate: "Mar 2018",
    uploadFrequency: "5 videos/week",
    engagement: "12.3%",
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
    totalVideos: 234,
    totalViews: "45M",
    avgViews: "192K",
    joinedDate: "Jul 2020",
    uploadFrequency: "4 videos/week",
    engagement: "15.7%",
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
    totalVideos: 678,
    totalViews: "234M",
    avgViews: "345K",
    joinedDate: "Sep 2017",
    uploadFrequency: "Daily",
    engagement: "10.2%",
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
    totalVideos: 189,
    totalViews: "67M",
    avgViews: "354K",
    joinedDate: "May 2019",
    uploadFrequency: "2 videos/week",
    engagement: "14.1%",
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
    totalVideos: 892,
    totalViews: "456M",
    avgViews: "511K",
    joinedDate: "Feb 2016",
    uploadFrequency: "6 videos/week",
    engagement: "9.8%",
  },
  {
    id: 7,
    channelName: "Science Explained",
    channelAvatar: "SE",
    subscribers: "2.1M",
    isVerified: true,
    notificationsOn: true,
    description: "Making science accessible to everyone",
    coverImage: "linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)",
    totalVideos: 267,
    totalViews: "98M",
    avgViews: "367K",
    joinedDate: "Nov 2018",
    uploadFrequency: "2 videos/week",
    engagement: "11.5%",
  },
  {
    id: 8,
    channelName: "DIY Crafts",
    channelAvatar: "DC",
    subscribers: "1.5M",
    isVerified: true,
    notificationsOn: false,
    description: "Creative projects and craft tutorials",
    coverImage: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
    totalVideos: 423,
    totalViews: "76M",
    avgViews: "180K",
    joinedDate: "Jun 2019",
    uploadFrequency: "4 videos/week",
    engagement: "13.2%",
  },
];

export default function SubscriptionsPage() {
  const [theme] = useState("dark");
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [subscriptions, setSubscriptions] = useState(mockSubscriptions);
  const [sortOrder, setSortOrder] = useState("latest");

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

  const getChannelVideos = () => {
    if (!selectedChannel) return [];
    const videos = mockVideos[selectedChannel.id] || [];
    
    if (sortOrder === "latest") {
      return videos;
    } else if (sortOrder === "oldest") {
      return [...videos].reverse();
    }
    return videos;
  };

  const channelVideos = getChannelVideos();

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        {/* Header */}
        <div className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 dark:bg-slate-900/70 border-b border-slate-200/50 dark:border-slate-800/50 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 flex-1">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    placeholder="Search channels..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 focus:border-purple-400 dark:focus:border-purple-500 rounded-xl"
                  />
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
                className="text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 rounded-xl flex-shrink-0"
              >
                {viewMode === "grid" ? <List className="w-5 h-5" /> : <Grid3x3 className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {selectedChannel ? (
            <div className="space-y-6">
              {/* Back Button */}
              <Button
                variant="ghost"
                onClick={() => setSelectedChannel(null)}
                className="text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 -ml-2"
              >
                ← Back to all channels
              </Button>

              {/* Channel Header Card */}
              <Card className="overflow-hidden border-slate-200/50 dark:border-slate-800/50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-xl">
                <div
                  className="h-24 sm:h-32 md:h-40 lg:h-48 relative"
                  style={{ background: selectedChannel.coverImage }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                </div>
                <CardContent className="pt-0 pb-6 px-4 sm:px-6">
                  <div className="flex flex-col items-start gap-4">
                    {/* Avatar and Channel Info Row */}
                    <div className="flex items-start gap-3 sm:gap-4 w-full -mt-10 sm:-mt-12 md:-mt-14 lg:-mt-16">
                      <div
                        className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-xl sm:rounded-2xl lg:rounded-3xl flex items-center justify-center text-white font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl shadow-2xl border-3 sm:border-4 border-white dark:border-slate-900 flex-shrink-0"
                        style={{ background: selectedChannel.coverImage }}
                      >
                        {selectedChannel.channelAvatar}
                      </div>
                      <div className="flex-1 min-w-0 pt-6 sm:pt-8 md:pt-10 lg:pt-12">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 dark:text-white truncate">
                                {selectedChannel.channelName}
                              </h2>
                              {selectedChannel.isVerified && (
                                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-blue-500 flex-shrink-0" />
                              )}
                            </div>
                            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mb-2 sm:mb-3 flex items-center gap-2">
                              <Users className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                              <span className="truncate">{selectedChannel.subscribers} subscribers</span>
                            </p>
                            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 line-clamp-2">
                              {selectedChannel.description}
                            </p>
                          </div>
                          <Button
                            onClick={() => toggleNotifications(selectedChannel.id)}
                            className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white shadow-lg shadow-purple-500/30 rounded-xl px-4 sm:px-6 text-sm sm:text-base flex-shrink-0"
                          >
                            {selectedChannel.notificationsOn ? (
                              <Bell className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                            ) : (
                              <BellOff className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                            )}
                            <span className="hidden sm:inline">
                              {selectedChannel.notificationsOn ? "All notifications" : "Turn on notifications"}
                            </span>
                            <span className="sm:hidden">
                              {selectedChannel.notificationsOn ? "All" : "Turn on"}
                            </span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="border-slate-200/50 dark:border-slate-800/50 bg-gradient-to-br from-blue-50/80 to-cyan-50/80 dark:from-blue-950/30 dark:to-cyan-950/30 backdrop-blur-xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
                        <Video className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Total Videos</p>
                    <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
                      {selectedChannel.totalVideos}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-500 mt-2">
                      {selectedChannel.uploadFrequency}
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-slate-200/50 dark:border-slate-800/50 bg-gradient-to-br from-purple-50/80 to-pink-50/80 dark:from-purple-950/30 dark:to-pink-950/30 backdrop-blur-xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
                        <Eye className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Total Views</p>
                    <p className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                      {selectedChannel.totalViews}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-500 mt-2">
                      All time views
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-slate-200/50 dark:border-slate-800/50 bg-gradient-to-br from-amber-50/80 to-orange-50/80 dark:from-amber-950/30 dark:to-orange-950/30 backdrop-blur-xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/30">
                        <TrendingUp className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Avg. Views</p>
                    <p className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-400 dark:to-orange-400 bg-clip-text text-transparent">
                      {selectedChannel.avgViews}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-500 mt-2">
                      Per video
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-slate-200/50 dark:border-slate-800/50 bg-gradient-to-br from-emerald-50/80 to-teal-50/80 dark:from-emerald-950/30 dark:to-teal-950/30 backdrop-blur-xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                        <BarChart3 className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Engagement</p>
                    <p className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">
                      {selectedChannel.engagement}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-500 mt-2">
                      Average rate
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Additional Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card className="border-slate-200/50 dark:border-slate-800/50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-slate-600 dark:text-slate-400">Joined YouTube</p>
                        <p className="font-semibold text-slate-900 dark:text-white">
                          {selectedChannel.joinedDate}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-slate-200/50 dark:border-slate-800/50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center">
                        <Award className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-slate-600 dark:text-slate-400">Upload Frequency</p>
                        <p className="font-semibold text-slate-900 dark:text-white">
                          {selectedChannel.uploadFrequency}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Videos Section */}
              <Card className="border-slate-200/50 dark:border-slate-800/50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl text-slate-900 dark:text-white">
                      All Videos
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <Button
                        variant={sortOrder === "latest" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSortOrder("latest")}
                        className={sortOrder === "latest" 
                          ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white" 
                          : "border-slate-300 dark:border-slate-700"}
                      >
                        Latest
                      </Button>
                      <Button
                        variant={sortOrder === "oldest" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSortOrder("oldest")}
                        className={sortOrder === "oldest" 
                          ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white" 
                          : "border-slate-300 dark:border-slate-700"}
                      >
                        Oldest
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {channelVideos.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {channelVideos.map((video) => (
                        <Card
                          key={video.id}
                          className="group overflow-hidden border-slate-200/50 dark:border-slate-800/50 bg-slate-50 dark:bg-slate-800/50 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                        >
                          <div className="relative">
                            <div
                              className="aspect-video w-full"
                              style={{ background: video.thumbnail }}
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-2xl">
                                <Play className="w-7 h-7 text-white ml-1" />
                              </div>
                            </div>
                            <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/80 text-white text-xs font-semibold rounded">
                              {video.duration}
                            </div>
                          </div>
                          <CardContent className="p-4">
                            <h4 className="font-semibold text-slate-900 dark:text-white mb-2 line-clamp-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors text-sm">
                              {video.title}
                            </h4>
                            <div className="flex items-center gap-3 text-xs text-slate-600 dark:text-slate-400">
                              <div className="flex items-center gap-1">
                                <Eye className="w-3 h-3" />
                                {video.views}
                              </div>
                              <div className="flex items-center gap-1">
                                <ThumbsUp className="w-3 h-3" />
                                {video.likes}
                              </div>
                            </div>
                            <p className="text-xs text-slate-500 dark:text-slate-500 mt-2">
                              {video.uploadedAt}
                            </p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 mx-auto bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-700 rounded-full flex items-center justify-center shadow-lg mb-4">
                        <Video className="w-8 h-8 text-slate-400 dark:text-slate-500" />
                      </div>
                      <p className="text-slate-600 dark:text-slate-400">No videos available</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          ) : (
            <div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                All Subscriptions
              </h2>
              <div
                className={`grid gap-4 ${
                  viewMode === "grid"
                    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                    : "grid-cols-1 max-w-3xl"
                }`}
              >
                {filteredSubscriptions.map((sub) => (
                  <Card
                    key={sub.id}
                    onClick={() => setSelectedChannel(sub)}
                    className="group overflow-hidden border-slate-200/50 dark:border-slate-800/50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer hover:scale-105"
                  >
                    <div
                      className="h-24 relative"
                      style={{ background: sub.coverImage }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <div className="absolute bottom-3 right-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleNotifications(sub.id);
                          }}
                          className="p-2 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 transition-all"
                        >
                          {sub.notificationsOn ? (
                            <Bell className="w-4 h-4 text-white" />
                          ) : (
                            <BellOff className="w-4 h-4 text-white" />
                          )}
                        </button>
                      </div>
                    </div>
                    <CardContent className="p-4 pt-0">
                      <div className="flex items-start gap-3 -mt-8">
                        <div
                          className="w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-xl border-3 border-white dark:border-slate-900 flex-shrink-0"
                          style={{ background: sub.coverImage }}
                        >
                          {sub.channelAvatar}
                        </div>
                        <div className="flex-1 min-w-0 pt-2">
                          <div className="flex items-center gap-1.5 mb-1">
                            <h3 className="font-semibold text-slate-900 dark:text-white text-sm truncate group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                              {sub.channelName}
                            </h3>
                            {sub.isVerified && (
                              <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0" />
                            )}
                          </div>
                          <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                            {sub.subscribers} subscribers
                          </p>
                          <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-500">
                            <span className="flex items-center gap-1">
                              <Video className="w-3 h-3" />
                              {sub.totalVideos}
                            </span>
                            <span className="flex items-center gap-1">
                              <Eye className="w-3 h-3" />
                              {sub.totalViews}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredSubscriptions.length === 0 && (
                <Card className="border-slate-200/50 dark:border-slate-800/50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-xl">
                  <CardContent className="flex flex-col items-center justify-center py-16 px-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-700 rounded-full flex items-center justify-center shadow-lg mb-4">
                      <Search className="w-10 h-10 text-slate-400 dark:text-slate-500" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                      No channels found
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 text-center">
                      Try adjusting your search query
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}