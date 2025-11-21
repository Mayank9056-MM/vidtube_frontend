import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/app/store";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Heart,
  MessageCircle,
  Repeat2,
  Share2,
  ImagePlus,
  Smile,
  Send,
  TrendingUp,
  Hash,
  Sparkles,
  MoreHorizontal,
  Bookmark,
  BarChart3,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import {
  createTweet,
  deleteTweet,
  getAllTweets,
  getUserTweets,
  updateTweet,
} from "@/features/tweet/tweetThunks";
import { useToast } from "@/hooks/useToast";
import { formatDate } from "@/utls/helpers";
import type { Tweet } from "@/features/tweet/tweetSlice";

const trendingTopics = [
  { tag: "VidTubeLive", tweets: "12.5K" },
  { tag: "StreamingNow", tweets: "8.3K" },
  { tag: "ContentCreators", tweets: "5.7K" },
  { tag: "VideoTech", tweets: "4.2K" },
];

const suggestedUsers = [
  { name: "Tech Weekly", handle: "@techweekly", avatar: "TW" },
  { name: "Video Masters", handle: "@videomasters", avatar: "VM" },
  { name: "Creative Hub", handle: "@creativehub", avatar: "CH" },
];

export default function TweetPage() {
  const theme = useSelector((state: RootState) => state.user.theme);
  const [tweetContent, setTweetContent] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const dispatch = useAppDispatch();
  const { showSuccess, showError } = useToast();
  const { tweets } = useAppSelector((state: RootState) => state.tweet);
  const { user } = useAppSelector((state: RootState) => state.user);
  const [editingTweet, setEditingTweet] = useState<Tweet | null>(null);
  const [editContent, setEditContent] = useState("");

  useEffect(() => {
    const AllTweets = async () => {
      try {
        await dispatch(getAllTweets());
        await dispatch(getUserTweets());
      } catch (error) {
        console.log(error);
      }
    };

    AllTweets();
  }, [dispatch]);

  const handlePostTweet = async () => {
    if (tweetContent.trim().length === 0) return;

    setIsPosting(true);

    try {
      await dispatch(createTweet(tweetContent));
      setTweetContent("");
      showSuccess("Tweet created successfully");
    } catch (error) {
      console.log(error);
      showError("Failed to post tweet");
    } finally {
      setIsPosting(false);
    }
  };

  const openEditModal = (tweet: Tweet) => {
    setEditingTweet(tweet);
    setEditContent(tweet.content);
  };

  const handleDelete = async (tweetId: string) => {
    try {
      await dispatch(deleteTweet(tweetId)).unwrap();
      showSuccess("Tweet deleted");
    } catch (error) {
      showError("Failed to delete tweet");
    }
  };

  const handleUpdateTweet = async () => {
    if (!editingTweet) return;
    try {
      await dispatch(
        updateTweet({ tweetId: editingTweet._id, content: editContent })
      ).unwrap();
      showSuccess("Tweet updated");
      setEditingTweet(null);
    } catch (err) {
      showError("Failed to update tweet");
    }
  };

  const maxChars = 280;
  const charsRemaining = maxChars - tweetContent.length;
  const charPercentage = (charsRemaining / maxChars) * 100;

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      {editingTweet && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <Card className="p-6 w-[400px] bg-white dark:bg-gray-900 border">
            <h2 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
              Edit Tweet
            </h2>

            <Textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="min-h-[120px] bg-gray-100 dark:bg-gray-800"
            />

            <div className="flex justify-end gap-3 mt-4">
              <Button
                onClick={() => setEditingTweet(null)}
                variant="outline"
                className="border-gray-400 dark:border-gray-600"
              >
                Cancel
              </Button>

              <Button
                onClick={handleUpdateTweet}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Save
              </Button>
            </div>
          </Card>
        </div>
      )}

      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50/20 dark:from-gray-950 dark:via-black dark:to-red-950/10 transition-colors duration-300">
        {/* Header - Sticky on mobile */}
        <div className="sticky top-0 z-30 backdrop-blur-xl bg-white/80 dark:bg-gray-950/80 border-b border-gray-200 dark:border-gray-800 px-4 py-3 md:hidden">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold bg-gradient-to-r from-red-600 to-red-700 dark:from-red-400 dark:to-red-500 bg-clip-text text-transparent">
              Tweets
            </h1>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 text-sm font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{tweets?.length || 0}</span>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
            {/* Main Content */}
            <div className="lg:col-span-7 xl:col-span-8 space-y-4 sm:space-y-6">
              {/* Desktop Header */}
              <div className="hidden md:flex items-center justify-between">
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-red-600 via-red-500 to-red-700 dark:from-red-500 dark:via-red-400 dark:to-red-600 bg-clip-text text-transparent">
                    Tweets
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm lg:text-base">
                    Share your thoughts with the community
                  </p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 text-sm font-medium">
                  <Sparkles className="w-4 h-4" />
                  <span>{tweets?.length || 0} Tweets</span>
                </div>
              </div>

              {/* Tweet Composer */}
              <Card className="shadow-lg sm:shadow-xl border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden">
                <CardHeader className="pb-3 px-3 sm:px-6 pt-4 sm:pt-6">
                  <div className="flex items-start gap-2 sm:gap-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-red-500 to-red-700 dark:from-red-600 dark:to-red-800 flex items-center justify-center text-white font-bold text-sm sm:text-lg flex-shrink-0 shadow-md">
                      YO
                    </div>
                    <div className="flex-1 min-w-0">
                      <Textarea
                        placeholder="What's happening on VidTube?"
                        value={tweetContent}
                        onChange={(e) => setTweetContent(e.target.value)}
                        className="min-h-[100px] sm:min-h-[120px] bg-gray-50 dark:bg-gray-950 border-gray-300 dark:border-gray-700 focus:border-red-500 dark:focus:border-red-500 focus:ring-red-500 resize-none text-sm sm:text-base"
                        maxLength={maxChars}
                        disabled={isPosting}
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardFooter className="flex flex-col gap-3 pt-0 px-3 sm:px-6 pb-4 sm:pb-6">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-1 sm:gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 h-8 w-8 sm:h-9 sm:w-9 p-0"
                        disabled={isPosting}
                      >
                        <ImagePlus className="w-4 h-4 sm:w-5 sm:h-5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 h-8 w-8 sm:h-9 sm:w-9 p-0"
                        disabled={isPosting}
                      >
                        <Smile className="w-4 h-4 sm:w-5 sm:h-5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 h-8 w-8 sm:h-9 sm:w-9 p-0"
                        disabled={isPosting}
                      >
                        <Hash className="w-4 h-4 sm:w-5 sm:h-5" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-3">
                      {tweetContent.length > 0 && (
                        <div className="flex items-center gap-2">
                          <svg className="w-7 h-7 sm:w-8 sm:h-8 transform -rotate-90">
                            <circle
                              cx="16"
                              cy="16"
                              r="12"
                              stroke="currentColor"
                              strokeWidth="3"
                              fill="none"
                              className="text-gray-200 dark:text-gray-700"
                            />
                            <circle
                              cx="16"
                              cy="16"
                              r="12"
                              stroke="currentColor"
                              strokeWidth="3"
                              fill="none"
                              strokeDasharray={`${2 * Math.PI * 12}`}
                              strokeDashoffset={`${
                                2 * Math.PI * 12 * (1 - charPercentage / 100)
                              }`}
                              className={`transition-all duration-300 ${
                                charsRemaining < 20
                                  ? "text-red-500"
                                  : charsRemaining < 50
                                  ? "text-yellow-500"
                                  : "text-red-500"
                              }`}
                            />
                          </svg>
                          {charsRemaining < 20 && (
                            <span className="text-xs sm:text-sm font-medium text-red-600 dark:text-red-400">
                              {charsRemaining}
                            </span>
                          )}
                        </div>
                      )}
                      <Button
                        onClick={handlePostTweet}
                        disabled={
                          tweetContent.trim().length === 0 ||
                          isPosting ||
                          charsRemaining < 0
                        }
                        className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 dark:from-red-500 dark:to-red-600 dark:hover:from-red-600 dark:hover:to-red-700 text-white font-semibold shadow-lg h-9 sm:h-10 px-4 sm:px-6 text-sm sm:text-base"
                      >
                        {isPosting ? (
                          <span className="flex items-center gap-2">
                            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span className="hidden sm:inline">Posting...</span>
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">
                            <Send className="w-4 h-4" />
                            <span className="hidden sm:inline">Post</span>
                          </span>
                        )}
                      </Button>
                    </div>
                  </div>
                </CardFooter>
              </Card>

              {/* Tweet Feed */}
              <div className="space-y-3 sm:space-y-4">
                {tweets && tweets.length > 0 ? (
                  tweets.map((tweet) => (
                    <Card
                      key={tweet?._id}
                      className="shadow-md sm:shadow-lg border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:shadow-xl transition-all duration-300 overflow-hidden"
                    >
                      <CardHeader className="pb-3 px-3 sm:px-6 pt-4 sm:pt-6">
                        <div className="flex items-start gap-2 sm:gap-3">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-red-500 to-red-700 dark:from-red-600 dark:to-red-800 flex items-center justify-center flex-shrink-0 shadow-md overflow-hidden">
                            {tweet?.owner?.avatar ? (
                              <img
                                src={tweet.owner.avatar}
                                alt={tweet?.owner?.fullName}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <span className="text-white font-bold text-sm sm:text-lg">
                                {tweet?.owner?.fullName
                                  ?.charAt(0)
                                  .toUpperCase()}
                              </span>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <div className="min-w-0 flex-1">
                                <p className="font-bold text-gray-900 dark:text-white truncate text-sm sm:text-base">
                                  {tweet?.owner?.fullName}
                                </p>
                                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate">
                                  @{tweet?.owner?.username}
                                </p>
                              </div>
                              <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                                <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                                  {formatDate(tweet?.createdAt)}
                                </span>
                              </div>
                              {/* Show edit/delete ONLY if user owns tweet */}
                              {tweet.owner._id === user?._id && (
                                <div className="flex gap-2">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => openEditModal(tweet)}
                                  >
                                    Edit
                                  </Button>

                                  <Button
                                    size="sm"
                                    variant="destructive"
                                    onClick={() => handleDelete(tweet._id)}
                                  >
                                    Delete
                                  </Button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-3 px-3 sm:px-6">
                        <p className="text-gray-800 dark:text-gray-200 leading-relaxed text-sm sm:text-base whitespace-pre-wrap break-words">
                          {tweet.content}
                        </p>
                      </CardContent>
                      <CardFooter className="pt-0 pb-3 px-3 sm:px-6 border-t border-gray-100 dark:border-gray-800">
                        <div className="flex items-center justify-between w-full pt-3">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 gap-1.5 sm:gap-2 h-8 sm:h-9 px-2 sm:px-3"
                          >
                            <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                            <span className="text-xs sm:text-sm">
                              {tweet.replies || 0}
                            </span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-950/30 gap-1.5 sm:gap-2 h-8 sm:h-9 px-2 sm:px-3"
                          >
                            <Repeat2 className="w-4 h-4 sm:w-5 sm:h-5" />
                            <span className="text-xs sm:text-sm">
                              {tweet.retweets || 0}
                            </span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 gap-1.5 sm:gap-2 h-8 sm:h-9 px-2 sm:px-3"
                          >
                            <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
                            <span className="text-xs sm:text-sm">
                              {tweet.likes || 0}
                            </span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 h-8 sm:h-9 w-8 sm:w-9 p-0"
                          >
                            <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="hidden sm:flex text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 h-8 sm:h-9 w-8 sm:w-9 p-0"
                          >
                            <Bookmark className="w-4 h-4 sm:w-5 sm:h-5" />
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  ))
                ) : (
                  <Card className="shadow-lg border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                    <CardContent className="py-12 sm:py-16 text-center">
                      <MessageCircle className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-gray-300 dark:text-gray-700 mb-4" />
                      <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">
                        No tweets yet. Be the first to share something!
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-5 xl:col-span-4 hidden lg:block">
              <div className="sticky top-6 space-y-6">
                {/* Trending Topics */}
                <Card className="shadow-xl border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-red-600 dark:text-red-400" />
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                        Trending Now
                      </h2>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-1 px-0">
                    {trendingTopics.map((topic, index) => (
                      <div
                        key={index}
                        className="px-6 py-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer transition-all duration-200 group"
                      >
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Trending in VidTube
                        </p>
                        <p className="font-bold text-gray-900 dark:text-white mt-0.5 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                          #{topic.tag}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                          {topic.tweets} tweets
                        </p>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Who to Follow */}
                <Card className="shadow-xl border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden">
                  <CardHeader className="pb-4">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                      Who to follow
                    </h2>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {suggestedUsers.map((user, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-red-700 dark:from-red-600 dark:to-red-800 flex items-center justify-center text-white font-bold shadow-md">
                            {user.avatar}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 dark:text-white text-sm">
                              {user.name}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {user.handle}
                            </p>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          className="bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 text-white text-xs h-8 px-4"
                        >
                          Follow
                        </Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
