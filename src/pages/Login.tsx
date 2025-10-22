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
import { Eye, EyeOff, LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useForm } from "react-hook-form";
import type { LoginUserData } from "../api/userApi.types";
import { loginUser } from "@/features/user/userThunks";
import { useToast } from "@/hooks/useToast";
import type { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { logger } from "@/utls/logger";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const theme = useSelector((state: RootState) => state.user.theme);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { showError, showSuccess } = useToast();

  const { loading } = useAppSelector((state) => state.user);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<LoginUserData>();

  const onSubmit = async (data: LoginUserData) => {
    logger.debug("data from login page", data);
    console.log(data);
    const res = await dispatch(loginUser(data));
    if (loginUser.fulfilled.match(res)) {
      showSuccess("Login successful 🎉");
      navigate("/home");
    } else {
      showError(res.message || "Invalid credentials");
    }
  };

  const handleForgotPassword = () => {
    console.log("Navigate to forgot password page");
    // Add your navigation logic here
  };

  const handleRegister = () => {
    console.log("Navigate to register page");
    // Add your navigation logic here
    navigate("/register");
  };

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4 transition-colors duration-300">
        <Card className="w-full max-w-md shadow-2xl">
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardHeader className="space-y-1">
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <LogIn className="w-6 h-6 text-white" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-center">
                Welcome back
              </CardTitle>
              <CardDescription className="text-center">
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="emailOrUsername">Email or Username</Label>
                <Input
                  id="emailOrUsername"
                  type="text"
                  placeholder="Enter your email or username"
                  {...register("emailOrUsername")}
                  className={errors.emailOrUsername ? "border-red-500" : ""}
                  disabled={isSubmitting || loading}
                />
                {errors.emailOrUsername && (
                  <p className="text-sm text-red-500">
                    {errors.emailOrUsername.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    {...register("password")}
                    className={
                      errors.password ? "border-red-500 pr-10" : "pr-10"
                    }
                    disabled={isSubmitting || loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-end">
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                  // disabled={isLoading}
                >
                  Forgot password?
                </button>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col space-y-4">
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium"
                disabled={!isValid || isSubmitting || loading}
              >
                {isSubmitting || loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Signing in...
                  </span>
                ) : (
                  "Sign in"
                )}
              </Button>
              <div className="text-center text-sm text-slate-600 dark:text-slate-400">
                New here?{" "}
                <button
                  type="button"
                  onClick={handleRegister}
                  className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                  // disabled={isLoading}
                >
                  Register
                </button>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
