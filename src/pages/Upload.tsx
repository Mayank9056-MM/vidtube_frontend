import { useState } from "react";
import { useAppSelector } from "@/app/hooks";
import type { RootState } from "@/app/store";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
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
  Menu,
  Upload,
  Video,
  Image,
  X,
  CheckCircle,
} from "lucide-react";
import { useForm } from "react-hook-form";

export interface PublishVideoData {
  video: File;
  thumbnail: File;
  title: string;
  description: string;
}

export default function UploadPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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
  } = useForm<Omit<PublishVideoData, "video" | "thumbnail">>();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

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

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 300);

    // Simulate API call
    setTimeout(() => {
      clearInterval(interval);
      setUploadProgress(100);
      setIsUploading(false);
      setUploadSuccess(true);

      // Reset after success
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
    <div
      className={`flex h-screen ${
        theme === "dark"
          ? "bg-gray-950 text-white"
          : "bg-white text-gray-900"
      }`}
    >
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Navbar */}
        <Navbar />

        {/* Mobile Menu Button */}
        <div className="lg:hidden sticky top-[60px] z-40">
          <button
            onClick={toggleSidebar}
            className={`m-4 p-2 rounded-lg ${
              theme === "dark"
                ? "bg-gray-800 hover:bg-gray-700"
                : "bg-gray-100 hover:bg-gray-200"
            } transition-colors`}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-2">Upload Video</h1>
              <p
                className={`${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Share your content with the world
              </p>
            </div>

            <div className="space-y-6">
              {/* Video Upload Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Video className="w-5 h-5" />
                    Video File
                  </CardTitle>
                  <CardDescription>
                    Upload your video file (MP4, MOV, AVI)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {!videoFile ? (
                    <label
                      className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
                        theme === "dark"
                          ? "border-gray-700 hover:border-gray-600 hover:bg-gray-800"
                          : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload
                          className={`w-12 h-12 mb-4 ${
                            theme === "dark" ? "text-gray-400" : "text-gray-500"
                          }`}
                        />
                        <p className="mb-2 text-sm font-semibold">
                          Click to upload video
                        </p>
                        <p
                          className={`text-xs ${
                            theme === "dark" ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
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
                    <div className="relative">
                      <video
                        src={videoPreview}
                        controls
                        className="w-full rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={removeVideo}
                        className={`absolute top-2 right-2 p-2 rounded-full ${
                          theme === "dark"
                            ? "bg-gray-800 hover:bg-gray-700"
                            : "bg-white hover:bg-gray-100"
                        } shadow-lg`}
                      >
                        <X className="w-5 h-5" />
                      </button>
                      <div
                        className={`mt-2 text-sm ${
                          theme === "dark" ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        {videoFile.name} ({(videoFile.size / (1024 * 1024)).toFixed(2)} MB)
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Thumbnail Upload Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Image className="w-5 h-5" />
                    Thumbnail
                  </CardTitle>
                  <CardDescription>
                    Upload a custom thumbnail for your video
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {!thumbnailFile ? (
                    <label
                      className={`flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
                        theme === "dark"
                          ? "border-gray-700 hover:border-gray-600 hover:bg-gray-800"
                          : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Image
                          className={`w-10 h-10 mb-4 ${
                            theme === "dark" ? "text-gray-400" : "text-gray-500"
                          }`}
                        />
                        <p className="mb-2 text-sm font-semibold">
                          Click to upload thumbnail
                        </p>
                        <p
                          className={`text-xs ${
                            theme === "dark" ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
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
                    <div className="relative">
                      <img
                        src={thumbnailPreview}
                        alt="Thumbnail preview"
                        className="w-full rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={removeThumbnail}
                        className={`absolute top-2 right-2 p-2 rounded-full ${
                          theme === "dark"
                            ? "bg-gray-800 hover:bg-gray-700"
                            : "bg-white hover:bg-gray-100"
                        } shadow-lg`}
                      >
                        <X className="w-5 h-5" />
                      </button>
                      <div
                        className={`mt-2 text-sm ${
                          theme === "dark" ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        {thumbnailFile.name}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Video Details Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Video Details</CardTitle>
                  <CardDescription>
                    Add title and description for your video
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      placeholder="Enter video title"
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
                      className={errors.title ? "border-red-500" : ""}
                    />
                    {errors.title && (
                      <p className="text-sm text-red-500">
                        {errors.title.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Tell viewers about your video"
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
                      className={errors.description ? "border-red-500" : ""}
                    />
                    {errors.description && (
                      <p className="text-sm text-red-500">
                        {errors.description.message}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Upload Progress */}
              {isUploading && (
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Uploading...</span>
                        <span>{uploadProgress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${uploadProgress}%` }}
                        ></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Success Message */}
              {uploadSuccess && (
                <Card className="border-green-500">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3 text-green-600 dark:text-green-400">
                      <CheckCircle className="w-6 h-6" />
                      <div>
                        <p className="font-semibold">Video uploaded successfully!</p>
                        <p className="text-sm">Your video is now being processed.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Submit Button */}
              <div className="flex gap-4">
                <Button
                  type="button"
                  onClick={handleSubmit(onSubmit)}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium"
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
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Uploading...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Upload className="w-5 h-5" />
                      Publish Video
                    </span>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}