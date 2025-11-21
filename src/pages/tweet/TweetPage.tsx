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
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { createTweet, getAllTweets } from "@/features/tweet/tweetThunks";
import { useToast } from "@/hooks/useToast";

// Mock tweet data
const initialTweets = [
  {
    id: 1,
    author: {
      name: "Sarah Johnson",
      username: "@sarahjdev",
      avatar: "SJ",
    },
    content:
      "Just discovered an amazing new feature in VidTube! The video quality is absolutely stunning. This platform keeps getting better! 🚀",
    timestamp: "2h ago",
    likes: 234,
    retweets: 45,
    replies: 18,
    isLiked: false,
  },
  {
    id: 2,
    author: {
      name: "Alex Chen",
      username: "@alexchen",
      avatar: "AC",
    },
    content:
      "Working on my new video series about web development. VidTube's streaming quality makes such a difference for tutorial content. Can't wait to share! 💻✨",
    timestamp: "4h ago",
    likes: 456,
    retweets: 89,
    replies: 34,
    isLiked: true,
  },
  {
    id: 3,
    author: {
      name: "Maria Rodriguez",
      username: "@mariar",
      avatar: "MR",
    },
    content:
      "The VidTube community is incredible! So much support and creativity here. Proud to be part of this journey. 🎥❤️",
    timestamp: "6h ago",
    likes: 892,
    retweets: 156,
    replies: 67,
    isLiked: false,
  },
  {
    id: 4,
    author: {
      name: "David Kim",
      username: "@davidk",
      avatar: "DK",
    },
    content:
      "Hot take: VidTube's dark mode is the best I've seen on any platform. The attention to detail is impressive! 🌙",
    timestamp: "8h ago",
    likes: 1203,
    retweets: 234,
    replies: 89,
    isLiked: true,
  },
];

const trendingTopics = [
  { tag: "VidTubeLive", tweets: "12.5K" },
  { tag: "StreamingNow", tweets: "8.3K" },
  { tag: "ContentCreators", tweets: "5.7K" },
  { tag: "VideoTech", tweets: "4.2K" },
];

export default function TweetPage() {
  const theme = useSelector((state: RootState) => state.user.theme);
  const [tweetContent, setTweetContent] = useState("");
  // const [tweets, setTweets] = useState(initialTweets);
  const [isPosting, setIsPosting] = useState(false);
  const dispatch = useAppDispatch();
  const { showSuccess, showInfo, showError } = useToast();
  const { userTweets, tweets } = useAppSelector(
    (state: RootState) => state.tweet
  );

  useEffect(() => {
    const AllTweets = async () => {
      try {
        await dispatch(getAllTweets());
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
      setIsPosting(true);
      await dispatch(createTweet(tweetContent));
      setTweetContent("");
      showSuccess("Tweet created successfully");
    } catch (error) {
      console.log(error);
    } finally {
      setIsPosting(false);
    }

    // // Simulate API call
    // setTimeout(() => {
    //   const newTweet = {
    //     id: tweets.length + 1,
    //     author: {
    //       name: "You",
    //       username: "@yourhandle",
    //       avatar: "YO",
    //     },
    //     content: tweetContent,
    //     timestamp: "Just now",
    //     likes: 0,
    //     retweets: 0,
    //     replies: 0,
    //     isLiked: false,
    //   };

    //   setTweets([newTweet, ...tweets]);
    //   setTweetContent("");
    //   setIsPosting(false);
    // }, 1000);
  };

  const handleLikeTweet = (tweetId: number) => {
    // setTweets(
    //   tweets.map((tweet) =>
    //     tweet.id === tweetId
    //       ? {
    //           ...tweet,
    //           isLiked: !tweet.isLiked,
    //           likes: tweet.isLiked ? tweet.likes - 1 : tweet.likes + 1,
    //         }
    //       : tweet
    //   )
    // );
  };

  const maxChars = 280;
  const charsRemaining = maxChars - tweetContent.length;

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50/30 dark:from-black dark:via-gray-950 dark:to-red-950/10">
        <div className="container mx-auto px-4 py-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Main Content - Tweet Composer & Feed */}
            <div className="lg:col-span-8 space-y-6">
              {/* Page Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-red-600 via-red-500 to-red-700 dark:from-red-500 dark:via-red-400 dark:to-red-600 bg-clip-text text-transparent">
                    Tweets
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    Share your thoughts with the community
                  </p>
                </div>
                <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-red-100 dark:bg-red-950/30 text-red-600 dark:text-red-400 text-sm font-medium">
                  <Sparkles className="w-4 h-4" />
                  <span>{tweets.length} Tweets</span>
                </div>
              </div>

              {/* Tweet Composer */}
              <Card className="shadow-xl border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl">
                <CardHeader className="pb-3">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-red-700 dark:from-red-600 dark:to-red-800 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                      YO
                    </div>
                    <div className="flex-1">
                      <Textarea
                        placeholder="What's happening on VidTube?"
                        value={tweetContent}
                        onChange={(e) => setTweetContent(e.target.value)}
                        className="min-h-[120px] bg-gray-50 dark:bg-gray-950 border-gray-300 dark:border-gray-700 focus:border-red-500 dark:focus:border-red-500 focus:ring-red-500 resize-none text-base"
                        maxLength={maxChars}
                        disabled={isPosting}
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardFooter className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-0">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30"
                      disabled={isPosting}
                    >
                      <ImagePlus className="w-5 h-5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30"
                      disabled={isPosting}
                    >
                      <Smile className="w-5 h-5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30"
                      disabled={isPosting}
                    >
                      <Hash className="w-5 h-5" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <span
                      className={`text-sm font-medium ${
                        charsRemaining < 20
                          ? "text-red-600 dark:text-red-400"
                          : "text-gray-500 dark:text-gray-400"
                      }`}
                    >
                      {charsRemaining}
                    </span>
                    <Button
                      onClick={handlePostTweet}
                      disabled={
                        tweetContent.trim().length === 0 ||
                        isPosting ||
                        charsRemaining < 0
                      }
                      className="w-full sm:w-auto bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 dark:from-red-500 dark:to-red-600 dark:hover:from-red-600 dark:hover:to-red-700 text-white font-semibold shadow-lg shadow-red-500/30 dark:shadow-red-900/50"
                    >
                      {isPosting ? (
                        <span className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Posting...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Send className="w-4 h-4" />
                          Post Tweet
                        </span>
                      )}
                    </Button>
                  </div>
                </CardFooter>
              </Card>

              {/* Tweet Feed */}
              <div className="space-y-4">
                {tweets && tweets?.map((tweet) => (
                  <Card
                    key={tweet?._id}
                    className="shadow-lg border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl hover:shadow-xl transition-all duration-300"
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-red-700 dark:from-red-600 dark:to-red-800 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                          <img src= {tweet?.owner?.avatar} alt="" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0">
                              <p className="font-bold text-gray-900 dark:text-white truncate">
                                {tweet?.owner?.fullName}
                              </p>
                              <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                                {tweet?.owner?.username}
                              </p>
                            </div>
                            <span className="text-sm text-gray-500 dark:text-gray-400 flex-shrink-0">
                              {tweet?.createdAt}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-4">
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {tweet.content}
                      </p>
                    </CardContent>
                    <CardFooter className="pt-0 border-t border-gray-200 dark:border-gray-800">
                      <div className="flex items-center justify-between w-full pt-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 gap-2"
                        >
                          <MessageCircle className="w-5 h-5" />
                          <span className="text-sm">{tweet.replies}</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-950/30 gap-2"
                        >
                          <Repeat2 className="w-5 h-5" />
                          <span className="text-sm">{tweet.retweets}</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleLikeTweet(tweet.id)}
                          className={`gap-2 ${
                            tweet.isLiked
                              ? "text-red-600 dark:text-red-400"
                              : "text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400"
                          } hover:bg-red-50 dark:hover:bg-red-950/30`}
                        >
                          <Heart
                            className={`w-5 h-5 ${
                              tweet.isLiked ? "fill-current" : ""
                            }`}
                          />
                          <span className="text-sm">{tweet.likes}</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30"
                        >
                          <Share2 className="w-5 h-5" />
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>

            {/* Sidebar - Trending Topics */}
            <div className="lg:col-span-4">
              <div className="sticky top-6 space-y-6">
                {/* Trending Topics Card */}
                <Card className="shadow-xl border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-red-600 dark:text-red-400" />
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                        Trending Now
                      </h2>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {trendingTopics.map((topic, index) => (
                      <div
                        key={index}
                        className="p-4 rounded-lg bg-gray-50 dark:bg-gray-950 hover:bg-red-50 dark:hover:bg-red-950/20 cursor-pointer transition-all duration-300 group"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Trending in VidTube
                            </p>
                            <p className="font-bold text-gray-900 dark:text-white mt-1 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                              #{topic.tag}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                              {topic.tweets} tweets
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Suggestions Card */}
                <Card className="shadow-xl border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl">
                  <CardHeader>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                      Who to follow
                    </h2>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      {
                        name: "Tech Weekly",
                        handle: "@techweekly",
                        avatar: "TW",
                      },
                      {
                        name: "Video Masters",
                        handle: "@videomasters",
                        avatar: "VM",
                      },
                      {
                        name: "Creative Hub",
                        handle: "@creativehub",
                        avatar: "CH",
                      },
                    ].map((user, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-red-700 dark:from-red-600 dark:to-red-800 flex items-center justify-center text-white font-bold">
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
                          className="bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 text-white text-xs"
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
