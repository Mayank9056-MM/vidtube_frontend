import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Bell,
  BellOff,
  Search,
  Eye,
  List,
  CheckCircle,
  Video,
  Grid3x3,
  UserMinus,
  UserPlus,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { getSubscribedChannels } from "@/features/subscription/subscriptionThunks";
import type { RootState } from "@/app/store";
import { useNavigate } from "react-router-dom";

export default function SubscriptionsPage() {
  const [theme] = useState("dark");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [hoveredChannel, setHoveredChannel] = useState(null);
  const { user } = useAppSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();
  const subscribedChannels = useAppSelector(
    (state: RootState) => state.subscription.subscribedChannels
  );
  const navigate = useNavigate();

  useEffect(() => {
    const getSubscibers = async () => {
      try {
        await dispatch(getSubscribedChannels(user?._id));
      } catch (error) {
        console.log(error);
      }
    };

    getSubscibers();
  }, [dispatch, user]);

  const toggleNotifications = (channelId, e) => {
    e.stopPropagation();
    // Your notification toggle logic here
    console.log("Toggle notifications for:", channelId);
  };

  const handleSubscribe = (channelId, e) => {
    e.stopPropagation();
    // Your subscribe logic here
    console.log("Subscribe to:", channelId);
  };

  const handleUnsubscribe = (channelId, e) => {
    e.stopPropagation();
    // Your unsubscribe logic here
    console.log("Unsubscribe from:", channelId);
  };

  const filteredChannels = subscribedChannels.filter((sub) =>
    sub?.channel?.username?.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
                onClick={() =>
                  setViewMode(viewMode === "grid" ? "list" : "grid")
                }
                className="text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 rounded-xl flex-shrink-0"
              >
                {viewMode === "grid" ? (
                  <List className="w-5 h-5" />
                ) : (
                  <Grid3x3 className="w-5 h-5" />
                )}
              </Button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
                All Subscriptions
              </h2>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                {filteredChannels.length} channel
                {filteredChannels.length !== 1 ? "s" : ""}
              </div>
            </div>

            <div
              className={`grid gap-4 ${
                viewMode === "grid"
                  ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                  : "grid-cols-1 max-w-3xl"
              }`}
            >
              {filteredChannels.map((sub) => (
                <Card
                  key={sub._id}
                  onMouseEnter={() => setHoveredChannel(sub._id)}
                  onMouseLeave={() => setHoveredChannel(null)}
                  onClick={() => navigate(`/channel/${sub.channel.username}`)}
                  className="group overflow-hidden border-slate-200/50 dark:border-slate-800/50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer hover:scale-[1.02] relative"
                >
                  {/* Cover Image */}
                  <div
                    className="h-24 relative overflow-hidden"
                    style={{
                      backgroundImage: `url(${
                        sub?.channel?.coverImage || "default-url-here"
                      })`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                    {/* Notification Bell */}
                    <div className="absolute top-3 right-3 flex gap-2">
                      <button
                        onClick={(e) => toggleNotifications(sub?._id, e)}
                        className="p-2 rounded-lg bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all border border-white/20 hover:border-white/40"
                        title={
                          sub?.notificationsOn
                            ? "Notifications on"
                            : "Notifications off"
                        }
                      >
                        {sub?.notificationsOn || true ? (
                          <Bell className="w-4 h-4 text-white drop-shadow-lg" />
                        ) : (
                          <BellOff className="w-4 h-4 text-white/70 drop-shadow-lg" />
                        )}
                      </button>
                    </div>

                    {/* Subscribe/Unsubscribe Button - Shows on hover */}
                    <div
                      className={`absolute bottom-3 right-3 transition-all duration-300 ${
                        hoveredChannel === sub._id
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-2"
                      }`}
                    >
                      <Button
                        onClick={(e) => handleUnsubscribe(sub._id, e)}
                        size="sm"
                        className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white border-0 shadow-lg rounded-lg px-3 py-1 text-xs font-medium backdrop-blur-md"
                      >
                        <UserMinus className="w-3 h-3 mr-1" />
                        Unsubscribe
                      </Button>
                    </div>
                  </div>

                  <CardContent className="p-4 pt-0">
                    <div className="flex items-start gap-3 -mt-8">
                      {/* Avatar */}
                      <div
                        className="w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-xl border-3 border-white dark:border-slate-900 flex-shrink-0 overflow-hidden ring-2 ring-purple-500/20"
                        style={{
                          background:
                            sub.channel.coverImage ||
                            "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        }}
                      >
                        {sub.channel.avatar ? (
                          <img
                            src={sub.channel.avatar}
                            alt={sub.channel.username}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span>
                            {sub.channel.username?.charAt(0).toUpperCase()}
                          </span>
                        )}
                      </div>

                      {/* Channel Info */}
                      <div className="flex-1 min-w-0 pt-2">
                        <div className="flex items-center gap-1.5 mb-1">
                          <h3 className="font-semibold text-slate-900 dark:text-white text-sm truncate group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                            {sub?.channel?.username || "Channel"}
                          </h3>
                          {true && (
                            <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0" />
                          )}
                        </div>

                        <p className="text-xs text-slate-600 dark:text-slate-400 mb-2 font-medium">
                          {sub?.subscribers || 0} subscribers
                        </p>

                        {/* <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-500">
                          <span className="flex items-center gap-1 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                            <Video className="w-3 h-3" />
                            {sub?.totalVideos || 0}
                          </span>
                          <span className="flex items-center gap-1 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                            <Eye className="w-3 h-3" />
                            {sub?.totalViews || 0}
                          </span>
                        </div> */}
                      </div>
                    </div>
                  </CardContent>

                  {/* Bottom gradient accent */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Card>
              ))}
            </div>

            {/* Empty State */}
            {filteredChannels.length === 0 && (
              <Card className="border-slate-200/50 dark:border-slate-800/50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-xl">
                <CardContent className="flex flex-col items-center justify-center py-16 px-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-500/20 to-blue-500/20 dark:from-purple-500/10 dark:to-blue-500/10 rounded-full flex items-center justify-center shadow-lg mb-4 border border-purple-500/20">
                    <Search className="w-10 h-10 text-purple-500 dark:text-purple-400" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                    {searchQuery ? "No channels found" : "No subscriptions yet"}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-center max-w-md">
                    {searchQuery
                      ? "Try adjusting your search query to find channels"
                      : "Start exploring and subscribe to channels you love"}
                  </p>
                  {!searchQuery && (
                    <Button className="mt-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl px-6">
                      <UserPlus className="w-4 h-4 mr-2" />
                      Explore Channels
                    </Button>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
