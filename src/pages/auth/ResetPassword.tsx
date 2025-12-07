import { useState, useEffect } from "react";
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
import { Eye, EyeOff, Lock, CheckCircle2, ShieldCheck } from "lucide-react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/app/hooks";
import type { RootState } from "@/app/store";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { resetPasswordUser } from "@/features/user/userThunks";
import { useToast } from "@/hooks/useToast";

interface ResetPasswordData {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

export default function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const [searchParams] = useSearchParams();
  const theme = useSelector((state: RootState) => state.user.theme);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { showError, showSuccess } = useToast();
  const { loading } = useSelector((state: RootState) => state.user);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    watch,
    setValue,
  } = useForm<ResetPasswordData>();

  // Get token from URL on component mount
  useEffect(() => {
    const tokenFromUrl = searchParams.get("token");
    if (tokenFromUrl) {
      setValue("token", tokenFromUrl);
    }
  }, [searchParams, setValue]);

  const newPassword = watch("newPassword");

  const onSubmit = async (data: ResetPasswordData) => {
    const res = await dispatch(
      resetPasswordUser({
        token: data.token,
        newPassword: data.newPassword,
      })
    );

    if (resetPasswordUser.fulfilled.match(res)) {
      showSuccess("Password reset successfully! 🎉");
      setResetSuccess(true);
      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } else {
      showError(res?.payload || "Failed to reset password. Invalid or expired token.");
    }
  };

  const handleBackToLogin = () => {
    navigate("/login");
  };

  // Password strength checker
  const getPasswordStrength = (password: string) => {
    if (!password) return { strength: 0, label: "", color: "" };
    
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;

    if (strength <= 2) return { strength, label: "Weak", color: "text-red-600 dark:text-red-400" };
    if (strength <= 3) return { strength, label: "Medium", color: "text-yellow-600 dark:text-yellow-400" };
    return { strength, label: "Strong", color: "text-green-600 dark:text-green-400" };
  };

  const passwordStrength = getPasswordStrength(newPassword || "");

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-gray-100 to-red-50 dark:from-black dark:via-gray-950 dark:to-red-950/20 p-3 sm:p-4 md:p-6 lg:p-8 transition-colors duration-500">
        {/* Main Container */}
        <div className="w-full max-w-7xl flex flex-col lg:flex-row items-center justify-center gap-6 sm:gap-8 lg:gap-12 xl:gap-16">
          {/* Left Side - Branding & Illustration */}
          <div className="w-full lg:w-1/2 flex flex-col items-center justify-center space-y-4 sm:space-y-6 lg:space-y-8 order-1 lg:order-1">
            {/* Logo */}
            <div className="flex items-center justify-center mb-2 sm:mb-4 lg:mb-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="96"
                height="96"
                viewBox="0 0 512 512"
                role="img"
                aria-labelledby="title desc"
                className="drop-shadow-2xl animate-fade-in w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32"
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
            <div className="text-center space-y-2 sm:space-y-3 lg:space-y-4 px-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-red-600 via-red-500 to-red-700 dark:from-red-500 dark:via-red-400 dark:to-red-600 bg-clip-text text-transparent animate-gradient">
                VidTube
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-400 font-medium max-w-md mx-auto">
                {resetSuccess ? "All set!" : "Create new password"}
              </p>
              <p className="text-xs sm:text-sm lg:text-base text-gray-500 dark:text-gray-500 max-w-sm mx-auto">
                {resetSuccess
                  ? "Your password has been reset successfully"
                  : "Choose a strong password to secure your account"}
              </p>
            </div>

            {/* Decorative Elements */}
            <div className="hidden md:flex gap-4 lg:gap-6 mt-4 lg:mt-8">
              <div className="px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-red-100 dark:bg-red-950/30 text-red-600 dark:text-red-400 text-xs sm:text-sm font-medium">
                🔐 Encrypted
              </div>
              <div className="px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-red-100 dark:bg-red-950/30 text-red-600 dark:text-red-400 text-xs sm:text-sm font-medium">
                🛡️ Protected
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="w-full lg:w-1/2 max-w-md order-2 lg:order-2">
            <Card className="shadow-2xl border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl">
              <CardHeader className="space-y-1 pb-4 sm:pb-6 px-4 sm:px-6">
                <div className="flex items-center justify-center mb-2">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-red-500 to-red-700 dark:from-red-600 dark:to-red-800 rounded-xl flex items-center justify-center shadow-lg shadow-red-500/50 dark:shadow-red-900/50">
                    {resetSuccess ? (
                      <CheckCircle2 className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                    ) : (
                      <ShieldCheck className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                    )}
                  </div>
                </div>
                <CardTitle className="text-2xl sm:text-3xl font-bold text-center text-gray-900 dark:text-white">
                  {resetSuccess ? "Password Reset!" : "Reset Password"}
                </CardTitle>
                <CardDescription className="text-center text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
                  {resetSuccess
                    ? "Redirecting you to login..."
                    : "Enter your reset token and new password"}
                </CardDescription>
              </CardHeader>

              {!resetSuccess ? (
                <>
                  <CardContent className="space-y-4 sm:space-y-5 px-4 sm:px-6">
                    {/* Token Input */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="token"
                        className="text-gray-700 dark:text-gray-300 font-medium text-sm sm:text-base"
                      >
                        Reset Token
                      </Label>
                      <Input
                        id="token"
                        type="text"
                        placeholder="Enter your reset token"
                        {...register("token", {
                          required: "Token is required",
                          minLength: {
                            value: 10,
                            message: "Invalid token format",
                          },
                        })}
                        className={`bg-gray-50 dark:bg-gray-950 border-gray-300 dark:border-gray-700 focus:border-red-500 dark:focus:border-red-500 focus:ring-red-500 transition-all font-mono text-xs sm:text-sm h-10 sm:h-11 ${
                          errors.token ? "border-red-500" : ""
                        }`}
                        disabled={isSubmitting || loading}
                      />
                      {errors.token && (
                        <p className="text-xs sm:text-sm text-red-500 flex items-center gap-1">
                          <span>⚠️</span>
                          {errors.token.message}
                        </p>
                      )}
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        💡 Token is automatically filled from the email link
                      </p>
                    </div>

                    {/* New Password Input */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="newPassword"
                        className="text-gray-700 dark:text-gray-300 font-medium text-sm sm:text-base"
                      >
                        New Password
                      </Label>
                      <div className="relative">
                        <Input
                          id="newPassword"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your new password"
                          {...register("newPassword", {
                            required: "Password is required",
                            minLength: {
                              value: 8,
                              message: "Password must be at least 8 characters",
                            },
                            pattern: {
                              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                              message: "Password must include uppercase, lowercase, and number",
                            },
                          })}
                          className={`bg-gray-50 dark:bg-gray-950 border-gray-300 dark:border-gray-700 focus:border-red-500 dark:focus:border-red-500 focus:ring-red-500 pr-10 sm:pr-12 transition-all h-10 sm:h-11 text-sm sm:text-base ${
                            errors.newPassword ? "border-red-500" : ""
                          }`}
                          disabled={isSubmitting || loading}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-colors"
                        >
                          {showPassword ? (
                            <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                          ) : (
                            <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                          )}
                        </button>
                      </div>
                      {errors.newPassword && (
                        <p className="text-xs sm:text-sm text-red-500 flex items-center gap-1">
                          <span>⚠️</span>
                          {errors.newPassword.message}
                        </p>
                      )}
                      
                      {/* Password Strength Indicator */}
                      {newPassword && (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-600 dark:text-gray-400">
                              Password Strength:
                            </span>
                            <span className={`text-xs font-semibold ${passwordStrength.color}`}>
                              {passwordStrength.label}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 sm:h-2">
                            <div
                              className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                                passwordStrength.strength <= 2
                                  ? "bg-red-500"
                                  : passwordStrength.strength <= 3
                                  ? "bg-yellow-500"
                                  : "bg-green-500"
                              }`}
                              style={{ width: `${(passwordStrength.strength / 5) * 100}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Confirm Password Input */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="confirmPassword"
                        className="text-gray-700 dark:text-gray-300 font-medium text-sm sm:text-base"
                      >
                        Confirm Password
                      </Label>
                      <div className="relative">
                        <Input
                          id="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm your new password"
                          {...register("confirmPassword", {
                            required: "Please confirm your password",
                            validate: (value) =>
                              value === newPassword || "Passwords do not match",
                          })}
                          className={`bg-gray-50 dark:bg-gray-950 border-gray-300 dark:border-gray-700 focus:border-red-500 dark:focus:border-red-500 focus:ring-red-500 pr-10 sm:pr-12 transition-all h-10 sm:h-11 text-sm sm:text-base ${
                            errors.confirmPassword ? "border-red-500" : ""
                          }`}
                          disabled={isSubmitting || loading}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-colors"
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                          ) : (
                            <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                          )}
                        </button>
                      </div>
                      {errors.confirmPassword && (
                        <p className="text-xs sm:text-sm text-red-500 flex items-center gap-1">
                          <span>⚠️</span>
                          {errors.confirmPassword.message}
                        </p>
                      )}
                    </div>

                    {/* Password Requirements */}
                    <div className="bg-gray-50 dark:bg-gray-950/50 border border-gray-200 dark:border-gray-800 rounded-lg p-3 sm:p-4">
                      <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Password Requirements:
                      </p>
                      <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                        <li className="flex items-center gap-2">
                          <span className={newPassword?.length >= 8 ? "text-green-500" : ""}>
                            {newPassword?.length >= 8 ? "✓" : "○"}
                          </span>
                          At least 8 characters
                        </li>
                        <li className="flex items-center gap-2">
                          <span className={/[A-Z]/.test(newPassword || "") ? "text-green-500" : ""}>
                            {/[A-Z]/.test(newPassword || "") ? "✓" : "○"}
                          </span>
                          One uppercase letter
                        </li>
                        <li className="flex items-center gap-2">
                          <span className={/[a-z]/.test(newPassword || "") ? "text-green-500" : ""}>
                            {/[a-z]/.test(newPassword || "") ? "✓" : "○"}
                          </span>
                          One lowercase letter
                        </li>
                        <li className="flex items-center gap-2">
                          <span className={/\d/.test(newPassword || "") ? "text-green-500" : ""}>
                            {/\d/.test(newPassword || "") ? "✓" : "○"}
                          </span>
                          One number
                        </li>
                      </ul>
                    </div>
                  </CardContent>

                  <CardFooter className="flex flex-col space-y-3 sm:space-y-4 pt-2 px-4 sm:px-6">
                    <Button
                      onClick={handleSubmit(onSubmit)}
                      className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 dark:from-red-500 dark:to-red-600 dark:hover:from-red-600 dark:hover:to-red-700 text-white font-semibold py-5 sm:py-6 text-sm sm:text-base shadow-lg shadow-red-500/30 dark:shadow-red-900/50 transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
                      disabled={!isValid || isSubmitting || loading}
                    >
                      {isSubmitting || loading ? (
                        <span className="flex items-center gap-2">
                          <span className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Resetting...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Lock className="w-4 h-4 sm:w-5 sm:h-5" />
                          Reset Password
                        </span>
                      )}
                    </Button>

                    <button
                      type="button"
                      onClick={handleBackToLogin}
                      className="w-full py-2 sm:py-3 px-4 text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 font-medium transition-colors duration-300 text-sm sm:text-base"
                    >
                      Back to Login
                    </button>
                  </CardFooter>
                </>
              ) : (
                <>
                  <CardContent className="space-y-4 sm:space-y-5 px-4 sm:px-6">
                    <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg p-4 sm:p-6 text-center space-y-3">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center mx-auto">
                        <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8 text-green-600 dark:text-green-400" />
                      </div>
                      <p className="text-xs sm:text-sm text-green-800 dark:text-green-300 font-semibold">
                        Password Reset Successful!
                      </p>
                      <p className="text-xs text-green-700 dark:text-green-400">
                        You can now sign in with your new password
                      </p>
                    </div>

                    <div className="text-center">
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                        Redirecting to login page in a moment...
                      </p>
                    </div>
                  </CardContent>

                  <CardFooter className="flex flex-col space-y-3 sm:space-y-4 pt-2 px-4 sm:px-6">
                    <Button
                      onClick={handleBackToLogin}
                      className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 dark:from-red-500 dark:to-red-600 dark:hover:from-red-600 dark:hover:to-red-700 text-white font-semibold py-5 sm:py-6 text-sm sm:text-base shadow-lg shadow-red-500/30 dark:shadow-red-900/50 transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
                    >
                      Go to Login
                    </Button>
                  </CardFooter>
                </>
              )}
            </Card>

            {/* Bottom Text */}
            <p className="text-center text-xs text-gray-500 dark:text-gray-500 mt-4 sm:mt-6 px-4">
              Token expired or invalid?{" "}
              <button
                onClick={() => navigate("/forgot-password")}
                className="text-red-600 dark:text-red-400 hover:underline font-medium"
              >
                Request a new one
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}