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
import { Mail, ArrowLeft, KeyRound, CheckCircle2 } from "lucide-react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/app/hooks";
import type { RootState } from "@/app/store";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { forgotPasswordUser } from "@/features/user/userThunks";
import { useToast } from "@/hooks/useToast";

interface ForgotPasswordData {
  email: string;
}

export default function ForgotPassword() {
  const [emailSent, setEmailSent] = useState(false);
  const theme = useSelector((state: RootState) => state.user.theme);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { showError, showSuccess } = useToast();
  const { loading } = useSelector((state: RootState) => state.user);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    getValues,
  } = useForm<ForgotPasswordData>();

  const onSubmit = async (data: ForgotPasswordData) => {
    const res = await dispatch(forgotPasswordUser(data));
    if (forgotPasswordUser.fulfilled.match(res)) {
      showSuccess("Password reset email sent! Check your inbox.");
      setEmailSent(true);
    } else {
      showError(res?.payload || "Failed to send reset email");
    }
  };

  const handleBackToLogin = () => {
    navigate("/login");
  };

  const handleResendEmail = async () => {
    const email = getValues("email");
    if (email) {
      const res = await dispatch(forgotPasswordUser({ email }));
      if (forgotPasswordUser.fulfilled.match(res)) {
        showSuccess("Email resent successfully!");
      } else {
        showError("Failed to resend email");
      }
    }
  };

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-gray-100 to-red-50 dark:from-black dark:via-gray-950 dark:to-red-950/20 p-4 lg:p-8 transition-colors duration-500">
        {/* Main Container */}
        <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">
          {/* Left Side - Branding & Illustration */}
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
                {emailSent ? "Check your email" : "Reset your password"}
              </p>
              <p className="text-sm lg:text-base text-gray-500 dark:text-gray-500 max-w-sm">
                {emailSent
                  ? "We've sent you instructions to reset your password"
                  : "Enter your email and we'll send you a reset link"}
              </p>
            </div>

            {/* Decorative Elements */}
            <div className="hidden lg:flex gap-6 mt-8">
              <div className="px-6 py-3 rounded-full bg-red-100 dark:bg-red-950/30 text-red-600 dark:text-red-400 text-sm font-medium">
                🔒 Secure
              </div>
              <div className="px-6 py-3 rounded-full bg-red-100 dark:bg-red-950/30 text-red-600 dark:text-red-400 text-sm font-medium">
                ⚡ Fast Recovery
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="w-full lg:w-1/2 max-w-md order-2 lg:order-2">
            <Card className="shadow-2xl border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl">
              <CardHeader className="space-y-1 pb-6">
                <div className="flex items-center justify-center mb-2">
                  <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-red-700 dark:from-red-600 dark:to-red-800 rounded-xl flex items-center justify-center shadow-lg shadow-red-500/50 dark:shadow-red-900/50">
                    {emailSent ? (
                      <CheckCircle2 className="w-7 h-7 text-white" />
                    ) : (
                      <KeyRound className="w-7 h-7 text-white" />
                    )}
                  </div>
                </div>
                <CardTitle className="text-3xl font-bold text-center text-gray-900 dark:text-white">
                  {emailSent ? "Email Sent!" : "Forgot Password?"}
                </CardTitle>
                <CardDescription className="text-center text-gray-600 dark:text-gray-400">
                  {emailSent
                    ? "Check your inbox for password reset instructions"
                    : "No worries, we'll send you reset instructions"}
                </CardDescription>
              </CardHeader>

              {!emailSent ? (
                <>
                  <CardContent className="space-y-5">
                    <div className="space-y-2">
                      <Label
                        htmlFor="email"
                        className="text-gray-700 dark:text-gray-300 font-medium"
                      >
                        Email Address
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email address"
                          {...register("email", {
                            required: "Email is required",
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: "Invalid email address",
                            },
                          })}
                          className={`bg-gray-50 dark:bg-gray-950 border-gray-300 dark:border-gray-700 focus:border-red-500 dark:focus:border-red-500 focus:ring-red-500 pl-10 transition-all ${
                            errors.email ? "border-red-500" : ""
                          }`}
                          disabled={isSubmitting || loading}
                        />
                      </div>
                      {errors.email && (
                        <p className="text-sm text-red-500 flex items-center gap-1">
                          <span>⚠️</span>
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                      <p className="text-sm text-blue-800 dark:text-blue-300">
                        💡 We'll send a password reset link to your email
                        address. The link will expire in 1 hour.
                      </p>
                    </div>
                  </CardContent>

                  <CardFooter className="flex flex-col space-y-4 pt-2">
                    <Button
                      onClick={handleSubmit(onSubmit)}
                      className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 dark:from-red-500 dark:to-red-600 dark:hover:from-red-600 dark:hover:to-red-700 text-white font-semibold py-6 text-base shadow-lg shadow-red-500/30 dark:shadow-red-900/50 transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
                      disabled={!isValid || isSubmitting || loading}
                    >
                      {isSubmitting || loading ? (
                        <span className="flex items-center gap-2">
                          <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Mail className="w-5 h-5" />
                          Send Reset Link
                        </span>
                      )}
                    </Button>

                    <button
                      type="button"
                      onClick={handleBackToLogin}
                      className="w-full py-3 px-4 flex items-center justify-center gap-2 text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 font-medium transition-colors duration-300"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Back to Login
                    </button>
                  </CardFooter>
                </>
              ) : (
                <>
                  <CardContent className="space-y-5">
                    <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg p-6 text-center space-y-3">
                      <div className="w-16 h-16 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center mx-auto">
                        <Mail className="w-8 h-8 text-green-600 dark:text-green-400" />
                      </div>
                      <p className="text-sm text-green-800 dark:text-green-300">
                        We've sent a password reset link to{" "}
                        <span className="font-semibold">
                          {getValues("email")}
                        </span>
                      </p>
                      <p className="text-xs text-green-700 dark:text-green-400">
                        Please check your inbox and spam folder
                      </p>
                    </div>

                    <div className="text-center space-y-2">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Didn't receive the email?
                      </p>
                      <button
                        type="button"
                        onClick={handleResendEmail}
                        className="text-sm font-medium text-red-600 hover:text-red-500 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                        disabled={loading}
                      >
                        {loading ? "Resending..." : "Resend Email"}
                      </button>
                    </div>
                  </CardContent>

                  <CardFooter className="flex flex-col space-y-4 pt-2">
                    <Button
                      onClick={handleBackToLogin}
                      className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 dark:from-red-500 dark:to-red-600 dark:hover:from-red-600 dark:hover:to-red-700 text-white font-semibold py-6 text-base shadow-lg shadow-red-500/30 dark:shadow-red-900/50 transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
                    >
                      <span className="flex items-center gap-2">
                        <ArrowLeft className="w-5 h-5" />
                        Back to Login
                      </span>
                    </Button>
                  </CardFooter>
                </>
              )}
            </Card>

            {/* Bottom Text */}
            <p className="text-center text-xs text-gray-500 dark:text-gray-500 mt-6">
              Remember your password?{" "}
              <button
                onClick={handleBackToLogin}
                className="text-red-600 dark:text-red-400 hover:underline font-medium"
              >
                Sign in here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
