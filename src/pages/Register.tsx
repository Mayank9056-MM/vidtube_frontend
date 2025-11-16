import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Eye,
  EyeOff,
  UserPlus,
  Upload,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import type { RootState } from "@/app/store";
import { useForm } from "react-hook-form";
import type { RegisterUserData } from "@/api/userApi.types";
import { registerUser } from "@/features/user/userThunks";
import { logger } from "@/utls/logger";
import { useToast } from "@/hooks/useToast";
import { useSelector } from "react-redux";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);

  const theme = useSelector((state: RootState) => state.user.theme);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { showSuccess, showError } = useToast();
  const { loading, error } = useAppSelector((state: RootState) => state.user);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RegisterUserData>();

  const onSubmit = async (data: RegisterUserData) => {
    const formData = new FormData();

    formData.append("fullName", data.fullName);
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("password", data.password);
    if (data.avatar) formData.append("avatar", data.avatar);
    if (data.coverImage) formData.append("coverImage", data.coverImage);

    try {
      logger.debug("data from register page", formData);
      const res = await dispatch(registerUser(formData));
      if (registerUser.fulfilled.match(res)) {
        showSuccess("Account created successfully!");
        navigate("/login");
      } else {
        showError("Registration failed. Try again.");
      }
    } catch (err: any) {
      logger.error("error in register page", err);
      showError(err.message || "Something went wrong");
    }
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "avatar" | "coverImage"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      showError("File too large (max 5MB)");
      return;
    }
    setValue(field, file);
    const reader = new FileReader();
    reader.onloadend = () => {
      if (field === "avatar") setAvatarPreview(reader.result as string);
      else setThumbnailPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const removeFile = (field: "avatar" | "coverImage") => {
    setValue(field, undefined);
    if (field === "avatar") setAvatarPreview(null);
    else setThumbnailPreview(null);
  };

  const handleLogin = () => navigate("/login");

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-gray-100 to-red-50 dark:from-black dark:via-gray-950 dark:to-red-950/20 p-4 lg:p-8 transition-colors duration-500">
        {/* Main Container */}
        <div className="w-full max-w-7xl flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">
          {/* Left Side - Branding */}
          <div className="w-full lg:w-1/2 flex flex-col items-center justify-center space-y-6 lg:space-y-8 order-1 lg:order-1">
            {/* Logo */}
            <div className="flex items-center justify-center mb-4 lg:mb-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="128"
                height="128"
                viewBox="0 0 512 512"
                role="img"
                aria-labelledby="title desc"
                className="drop-shadow-2xl animate-fade-in"
              >
                <title id="title">Vidtube Logo</title>
                <desc id="desc">
                  Red rounded-square icon with a white play button and a
                  stylized bird representing video + tweets.
                </desc>
                <defs>
                  <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
                    <stop offset="0" stopColor="#ff3b30" />
                    <stop offset="1" stopColor="#c0122a" />
                  </linearGradient>
                  <filter
                    id="shadow"
                    x="-50%"
                    y="-50%"
                    width="200%"
                    height="200%"
                  >
                    <feDropShadow
                      dx="0"
                      dy="6"
                      stdDeviation="12"
                      floodColor="#000"
                      floodOpacity="0.12"
                    />
                  </filter>
                </defs>
                <rect
                  x="24"
                  y="24"
                  width="464"
                  height="464"
                  rx="88"
                  fill="url(#g)"
                  filter="url(#shadow)"
                />
                <g transform="translate(140,124) scale(0.9)">
                  <path
                    d="M86 36.5C92.1 40 96 46.9 96 54.7V213.3C96 221.1 92.1 228 86 231.5C78.9 235 69.7 232.6 63.9 226.8L13.8 176.7C8.0 170.9 8.0 160.1 13.8 154.3L63.9 104.2C69.7 98.4 78.9 96 86 99.5Z"
                    fill="#ffffff"
                  />
                </g>
                <g transform="translate(300,120) scale(0.82)">
                  <path
                    d="M58.9 11.7c-2.1 0.9-4.3 1.5-6.6 1.8 2.4-1.4 4.3-3.6 5.2-6.3-2.3 1.4-4.9 2.4-7.6 3-2.2-2.3-5.3-3.7-8.8-3.7-6.7 0-12.1 5.4-12.1 12.1 0 0.95 0.11 1.88 0.31 2.77-10.05-0.5-18.96-5.32-24.94-12.62-1.04 1.79-1.63 3.86-1.63 6.08 0 4.19 2.13 7.9 5.36 10.07-1.98-0.062-3.84-0.61-5.46-1.51v0.15c0 5.85 4.17 10.74 9.71 11.85-1.02 0.28-2.09 0.43-3.2 0.43-0.78 0-1.54-0.075-2.28-0.21 1.55 4.79 6.05 8.28 11.39 8.38-4.18 3.27-9.46 5.22-15.19 5.22-0.99 0-1.97-0.058-2.93-0.17 5.42 3.47 11.86 5.49 18.77 5.49 22.52 0 34.86-18.66 34.86-34.86 0-0.53-0.012-1.06-0.036-1.58 2.4-1.72 4.48-3.86 6.13-6.31-2.19 0.97-4.55 1.62-7.02 1.91z"
                    fill="#fff"
                  />
                </g>
                <ellipse
                  cx="148"
                  cy="90"
                  rx="56"
                  ry="20"
                  fill="#ffffff"
                  opacity="0.06"
                />
              </svg>
            </div>

            {/* Branding Text */}
            <div className="text-center space-y-3 lg:space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-red-600 via-red-500 to-red-700 dark:from-red-500 dark:via-red-400 dark:to-red-600 bg-clip-text text-transparent animate-gradient">
                VidTube
              </h1>
              <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-400 font-medium max-w-md">
                Join our creative community
              </p>
              <p className="text-sm lg:text-base text-gray-500 dark:text-gray-500 max-w-sm">
                Create your account and start sharing amazing content
              </p>
            </div>

            {/* Decorative Elements */}
            <div className="hidden lg:flex gap-6 mt-8">
              <div className="px-6 py-3 rounded-full bg-red-100 dark:bg-red-950/30 text-red-600 dark:text-red-400 text-sm font-medium">
                🎥 Upload Videos
              </div>
              <div className="px-6 py-3 rounded-full bg-red-100 dark:bg-red-950/30 text-red-600 dark:text-red-400 text-sm font-medium">
                💬 Connect
              </div>
            </div>
          </div>

          {/* Right Side - Register Form */}
          <div className="w-full lg:w-1/2 max-w-2xl order-2 lg:order-2">
            <Card className="shadow-2xl border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl">
              <CardHeader className="space-y-1 pb-6">
                <div className="flex items-center justify-center mb-2">
                  <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-red-700 dark:from-red-600 dark:to-red-800 rounded-xl flex items-center justify-center shadow-lg shadow-red-500/50 dark:shadow-red-900/50">
                    <UserPlus className="w-7 h-7 text-white" />
                  </div>
                </div>
                <CardTitle className="text-3xl font-bold text-center text-gray-900 dark:text-white">
                  Create an account
                </CardTitle>
                <CardDescription className="text-center text-gray-600 dark:text-gray-400">
                  Enter your information to get started
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Avatar Upload */}
                <div className="space-y-2">
                  <Label htmlFor="avatar" className="text-gray-700 dark:text-gray-300 font-medium">
                    Avatar <span className="text-red-500">*</span>
                  </Label>
                  <div className="flex items-center gap-4">
                    {avatarPreview ? (
                      <div className="relative">
                        <img
                          src={avatarPreview}
                          alt="Avatar preview"
                          className="w-20 h-20 rounded-full object-cover border-2 border-red-200 dark:border-red-800 shadow-md"
                        />
                        <button
                          type="button"
                          onClick={() => removeFile("avatar")}
                          className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white hover:bg-red-600 transition-colors shadow-lg"
                          disabled={loading}
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-700">
                        <Upload className="w-8 h-8 text-gray-400" />
                      </div>
                    )}
                    <div className="flex-1">
                      <Input
                        id="avatar"
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, "avatar")}
                        className="bg-gray-50 dark:bg-gray-950 border-gray-300 dark:border-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100 dark:file:bg-red-950/50 dark:file:text-red-400 dark:hover:file:bg-red-950"
                        disabled={loading}
                      />
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        PNG, JPG up to 5MB
                      </p>
                    </div>
                  </div>
                  {errors.avatar && (
                    <p className="text-sm text-red-500 flex items-center gap-1">
                      <span>⚠️</span>
                      {String(errors.avatar.message)}
                    </p>
                  )}
                </div>

                {/* Cover Image Upload */}
                <div className="space-y-2">
                  <Label htmlFor="coverImage" className="text-gray-700 dark:text-gray-300 font-medium">
                    Cover Image (Optional)
                  </Label>
                  <div className="flex items-center gap-4">
                    {thumbnailPreview ? (
                      <div className="relative">
                        <img
                          src={thumbnailPreview}
                          alt="Cover preview"
                          className="w-32 h-20 rounded object-cover border-2 border-red-200 dark:border-red-800 shadow-md"
                        />
                        <button
                          type="button"
                          onClick={() => removeFile("coverImage")}
                          className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white hover:bg-red-600 transition-colors shadow-lg"
                          disabled={loading}
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="w-32 h-20 rounded bg-gray-100 dark:bg-gray-800 flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-700">
                        <Upload className="w-6 h-6 text-gray-400" />
                      </div>
                    )}
                    <div className="flex-1">
                      <Input
                        id="coverImage"
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, "coverImage")}
                        className="bg-gray-50 dark:bg-gray-950 border-gray-300 dark:border-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100 dark:file:bg-red-950/50 dark:file:text-red-400 dark:hover:file:bg-red-950"
                        disabled={loading}
                      />
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        PNG, JPG up to 5MB
                      </p>
                    </div>
                  </div>
                </div>

                {/* Full Name & Username Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-gray-700 dark:text-gray-300 font-medium">
                      Full Name
                    </Label>
                    <Input
                      id="fullName"
                      placeholder="John Doe"
                      {...register("fullName", { required: "Full name is required" })}
                      className="bg-gray-50 dark:bg-gray-950 border-gray-300 dark:border-gray-700 focus:border-red-500 dark:focus:border-red-500 focus:ring-red-500"
                      disabled={loading}
                    />
                    {errors.fullName && (
                      <p className="text-sm text-red-500 flex items-center gap-1">
                        <span>⚠️</span>
                        {errors.fullName.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="username" className="text-gray-700 dark:text-gray-300 font-medium">
                      Username
                    </Label>
                    <Input
                      id="username"
                      placeholder="johndoe"
                      {...register("username", {
                        required: "Username is required",
                      })}
                      className="bg-gray-50 dark:bg-gray-950 border-gray-300 dark:border-gray-700 focus:border-red-500 dark:focus:border-red-500 focus:ring-red-500"
                      disabled={loading}
                    />
                    {errors.username && (
                      <p className="text-sm text-red-500 flex items-center gap-1">
                        <span>⚠️</span>
                        {errors.username.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700 dark:text-gray-300 font-medium">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Invalid email address",
                      },
                    })}
                    className="bg-gray-50 dark:bg-gray-950 border-gray-300 dark:border-gray-700 focus:border-red-500 dark:focus:border-red-500 focus:ring-red-500"
                    disabled={loading}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500 flex items-center gap-1">
                      <span>⚠️</span>
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-700 dark:text-gray-300 font-medium">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 8,
                          message: "Password must be at least 8 characters",
                        },
                      })}
                      className="bg-gray-50 dark:bg-gray-950 border-gray-300 dark:border-gray-700 focus:border-red-500 dark:focus:border-red-500 focus:ring-red-500 pr-12"
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-colors"
                      disabled={loading}
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-sm text-red-500 flex items-center gap-1">
                      <span>⚠️</span>
                      {errors.password.message}
                    </p>
                  )}
                </div>
              </CardContent>

              <CardFooter className="flex flex-col space-y-4 pt-2">
                <Button
                  onClick={handleSubmit(onSubmit)}
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 dark:from-red-500 dark:to-red-600 dark:hover:from-red-600 dark:hover:to-red-700 text-white font-semibold py-6 text-base shadow-lg shadow-red-500/30 dark:shadow-red-900/50 transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Creating account...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <UserPlus className="w-5 h-5" />
                      Create account
                    </span>
                  )}
                </Button>

                <div className="relative w-full">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400">
                      Already have an account?
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleLogin}
                  className="w-full py-3 px-4 border-2 border-red-600 dark:border-red-500 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 font-semibold rounded-lg transition-all duration-300 hover:scale-[1.02]"
                  disabled={loading}
                >
                  Sign in
                </button>
              </CardFooter>
            </Card>

            {/* Bottom Text */}
            <p className="text-center text-xs text-gray-500 dark:text-gray-500 mt-6">
              By continuing, you agree to VidTube's{" "}
              <a
                href="#"
                className="text-red-600 dark:text-red-400 hover:underline"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="#"
                className="text-red-600 dark:text-red-400 hover:underline"
              >
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s ease infinite;
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}