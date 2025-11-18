import { useState } from "react";
import { useAppSelector } from "@/app/hooks";
import type { RootState } from "@/app/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Upload,
  Video,
  Image,
  X,
  CheckCircle,
  FileVideo,
  Sparkles,
} from "lucide-react";
import { useForm } from "react-hook-form";

export interface PublishVideoData {
  video: File;
  thumbnail: File;
  title: string;
  description: string;
}

export default function UploadPage() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string>("");
  const [thumbnailPreview, setThumbnailPreview] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const theme = useAppSelector((state: RootState) => state.user.theme);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch,
  } = useForm<Omit<PublishVideoData, "video" | "thumbnail">>();

  const title = watch("title");
  const description = watch("description");

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("video/")) {
      setVideoFile(file);
      const url = URL.createObjectURL(file);
      setVideoPreview(url);
    }
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setThumbnailFile(file);
      const url = URL.createObjectURL(file);
      setThumbnailPreview(url);
    }
  };

  const removeVideo = () => {
    setVideoFile(null);
    setVideoPreview("");
    if (videoPreview) URL.revokeObjectURL(videoPreview);
  };

  const removeThumbnail = () => {
    setThumbnailFile(null);
    setThumbnailPreview("");
    if (thumbnailPreview) URL.revokeObjectURL(thumbnailPreview);
  };

  const onSubmit = async (data: Omit<PublishVideoData, "video" | "thumbnail">) => {
    if (!videoFile || !thumbnailFile) {
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 300);

    setTimeout(() => {
      clearInterval(interval);
      setUploadProgress(100);
      setIsUploading(false);
      setUploadSuccess(true);

      setTimeout(() => {
        reset();
        removeVideo();
        removeThumbnail();
        setUploadSuccess(false);
        setUploadProgress(0);
      }, 2000);
    }, 3000);

    // Your actual API call would go here
    // const formData: PublishVideoData = {
    //   video: videoFile,
    //   thumbnail: thumbnailFile,
    //   title: data.title,
    //   description: data.description,
    // };
    // await dispatch(publishVideo(formData));
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 via-white to-red-50 dark:from-black dark:via-gray-950 dark:to-red-950/20 transition-colors duration-500">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        {/* Header Section */}
        <div className="mb-8 sm:mb-10 lg:mb-12 text-center lg:text-left">
          <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-red-500 to-red-700 dark:from-red-600 dark:to-red-800 rounded-xl flex items-center justify-center shadow-lg shadow-red-500/30 dark:shadow-red-900/50">
              <FileVideo className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-red-600 via-red-500 to-red-700 dark:from-red-500 dark:via-red-400 dark:to-red-600 bg-clip-text text-transparent">
                Upload Video
              </h1>
            </div>
          </div>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto lg:mx-0">
            Share your creativity with the world. Upload your video and reach millions of viewers.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left Column - Upload Files */}
          <div className="lg:col-span-2 space-y-6">
            {/* Video Upload Card */}
            <Card className="border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-xl sm:text-2xl">
                  <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 dark:from-red-600 dark:to-red-700 rounded-lg flex items-center justify-center">
                    <Video className="w-4 h-4 text-white" />
                  </div>
                  Video File
                </CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Upload your video content (MP4, MOV, AVI - Max 2GB)
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!videoFile ? (
                  <label className="group flex flex-col items-center justify-center w-full h-48 sm:h-56 lg:h-64 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300 border-gray-300 hover:border-red-500 dark:border-gray-700 dark:hover:border-red-500 bg-gray-50 hover:bg-red-50/50 dark:bg-gray-950 dark:hover:bg-red-950/30">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-red-100 to-red-200 dark:from-red-950/50 dark:to-red-900/50 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                        <Upload className="w-8 h-8 sm:w-10 sm:h-10 text-red-600 dark:text-red-400" />
                      </div>
                      <p className="mb-2 text-sm sm:text-base font-semibold text-gray-700 dark:text-gray-300">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                        MP4, MOV, or AVI (MAX. 2GB)
                      </p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept="video/*"
                      onChange={handleVideoChange}
                    />
                  </label>
                ) : (
                  <div className="relative group">
                    <video
                      src={videoPreview}
                      controls
                      className="w-full rounded-xl shadow-lg"
                    />
                    <button
                      type="button"
                      onClick={removeVideo}
                      className="absolute top-3 right-3 p-2 rounded-full bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 text-white shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                    >
                      <X className="w-5 h-5" />
                    </button>
                    <div className="mt-3 p-3 rounded-lg bg-gray-100 dark:bg-gray-800/50 flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate flex-1">
                        {videoFile.name}
                      </span>
                      <span className="text-xs font-semibold text-red-600 dark:text-red-400 ml-2">
                        {(videoFile.size / (1024 * 1024)).toFixed(2)} MB
                      </span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Thumbnail Upload Card */}
            <Card className="border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-xl sm:text-2xl">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 dark:from-purple-600 dark:to-purple-700 rounded-lg flex items-center justify-center">
                    <Image className="w-4 h-4 text-white" />
                  </div>
                  Thumbnail
                </CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Choose an eye-catching thumbnail (PNG, JPG, WEBP - Max 5MB)
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!thumbnailFile ? (
                  <label className="group flex flex-col items-center justify-center w-full h-40 sm:h-48 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300 border-gray-300 hover:border-purple-500 dark:border-gray-700 dark:hover:border-purple-500 bg-gray-50 hover:bg-purple-50/50 dark:bg-gray-950 dark:hover:bg-purple-950/30">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-950/50 dark:to-purple-900/50 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                        <Image className="w-7 h-7 sm:w-8 sm:h-8 text-purple-600 dark:text-purple-400" />
                      </div>
                      <p className="mb-2 text-sm sm:text-base font-semibold text-gray-700 dark:text-gray-300">
                        Click to upload thumbnail
                      </p>
                      <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                        PNG, JPG, or WEBP (MAX. 5MB)
                      </p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleThumbnailChange}
                    />
                  </label>
                ) : (
                  <div className="relative group">
                    <img
                      src={thumbnailPreview}
                      alt="Thumbnail preview"
                      className="w-full rounded-xl shadow-lg object-cover"
                    />
                    <button
                      type="button"
                      onClick={removeThumbnail}
                      className="absolute top-3 right-3 p-2 rounded-full bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-800 text-white shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                    >
                      <X className="w-5 h-5" />
                    </button>
                    <div className="mt-3 p-3 rounded-lg bg-gray-100 dark:bg-gray-800/50">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate block">
                        {thumbnailFile.name}
                      </span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Video Details */}
          <div className="space-y-6">
            <Card className="border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-xl sticky top-6">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-xl sm:text-2xl">
                  <Sparkles className="w-5 h-5 text-red-600 dark:text-red-400" />
                  Video Details
                </CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Add engaging title and description
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Title *
                  </Label>
                  <Input
                    id="title"
                    placeholder="Make it catchy and descriptive..."
                    {...register("title", {
                      required: "Title is required",
                      minLength: {
                        value: 3,
                        message: "Title must be at least 3 characters",
                      },
                      maxLength: {
                        value: 100,
                        message: "Title must not exceed 100 characters",
                      },
                    })}
                    className={`bg-gray-50 dark:bg-gray-950 border-gray-300 dark:border-gray-700 focus:border-red-500 dark:focus:border-red-500 focus:ring-red-500 transition-all ${
                      errors.title ? "border-red-500 dark:border-red-500" : ""
                    }`}
                  />
                  <div className="flex items-center justify-between text-xs">
                    {errors.title ? (
                      <p className="text-red-500 flex items-center gap-1">
                        <span>⚠️</span>
                        {errors.title.message}
                      </p>
                    ) : (
                      <span className="text-gray-500 dark:text-gray-400">
                        {title?.length || 0}/100 characters
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Description *
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Tell viewers what your video is about..."
                    rows={6}
                    {...register("description", {
                      required: "Description is required",
                      minLength: {
                        value: 10,
                        message: "Description must be at least 10 characters",
                      },
                      maxLength: {
                        value: 5000,
                        message: "Description must not exceed 5000 characters",
                      },
                    })}
                    className={`bg-gray-50 dark:bg-gray-950 border-gray-300 dark:border-gray-700 focus:border-red-500 dark:focus:border-red-500 focus:ring-red-500 transition-all resize-none ${
                      errors.description ? "border-red-500 dark:border-red-500" : ""
                    }`}
                  />
                  <div className="flex items-center justify-between text-xs">
                    {errors.description ? (
                      <p className="text-red-500 flex items-center gap-1">
                        <span>⚠️</span>
                        {errors.description.message}
                      </p>
                    ) : (
                      <span className="text-gray-500 dark:text-gray-400">
                        {description?.length || 0}/5000 characters
                      </span>
                    )}
                  </div>
                </div>

                {/* Upload Progress */}
                {isUploading && (
                  <div className="space-y-3 p-4 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 border border-blue-200 dark:border-blue-800">
                    <div className="flex justify-between items-center text-sm font-medium">
                      <span className="text-blue-700 dark:text-blue-300">Uploading your video...</span>
                      <span className="text-blue-600 dark:text-blue-400">{uploadProgress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 h-2.5 rounded-full transition-all duration-300 ease-out"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Success Message */}
                {uploadSuccess && (
                  <div className="p-4 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border border-green-200 dark:border-green-800">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-green-500 dark:bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-green-700 dark:text-green-300 text-sm">
                          Upload successful!
                        </p>
                        <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                          Your video is being processed and will be live shortly.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <Button
                  type="button"
                  onClick={handleSubmit(onSubmit)}
                  className="w-full bg-gradient-to-r from-red-600 via-red-500 to-red-700 hover:from-red-700 hover:via-red-600 hover:to-red-800 dark:from-red-500 dark:via-red-600 dark:to-red-700 dark:hover:from-red-600 dark:hover:via-red-700 dark:hover:to-red-800 text-white font-semibold py-6 text-base shadow-lg shadow-red-500/30 dark:shadow-red-900/50 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  disabled={
                    !videoFile ||
                    !thumbnailFile ||
                    !isValid ||
                    isUploading ||
                    uploadSuccess
                  }
                >
                  {isUploading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Uploading...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Upload className="w-5 h-5" />
                      Publish Video
                    </span>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}