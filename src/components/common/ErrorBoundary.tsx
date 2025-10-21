import { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  isDarkMode: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      isDarkMode: false,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });
  }

  componentDidMount() {
    this.checkDarkMode();
  }

  checkDarkMode = () => {
    const isDark = document.documentElement.classList.contains("dark");
    this.setState({ isDarkMode: isDark });
  };

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  handleGoHome = () => {
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className={this.state.isDarkMode ? "dark" : ""}>
          <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4 transition-colors duration-300">
            <Card className="w-full max-w-2xl shadow-2xl">
              <CardHeader className="space-y-1">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-600 rounded-lg flex items-center justify-center animate-pulse">
                    <AlertTriangle className="w-8 h-8 text-white" />
                  </div>
                </div>
                <CardTitle className="text-2xl font-bold text-center">
                  Oops! Something went wrong
                </CardTitle>
                <CardDescription className="text-center">
                  We encountered an unexpected error. Don't worry, we're on it!
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
                  <h3 className="font-semibold text-sm text-slate-700 dark:text-slate-300 mb-2">
                    Error Details:
                  </h3>
                  <p className="text-sm text-red-600 dark:text-red-400 font-mono break-words">
                    {this.state.error?.toString()}
                  </p>
                </div>

                {process.env.NODE_ENV === "development" && this.state.errorInfo && (
                  <details className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
                    <summary className="cursor-pointer font-semibold text-sm text-slate-700 dark:text-slate-300 mb-2">
                      Stack Trace (Development Only)
                    </summary>
                    <pre className="text-xs text-slate-600 dark:text-slate-400 overflow-auto mt-2 max-h-64">
                      {this.state.errorInfo.componentStack}
                    </pre>
                  </details>
                )}

                <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    <strong>What can you do?</strong>
                  </p>
                  <ul className="text-sm text-blue-700 dark:text-blue-300 mt-2 space-y-1 list-disc list-inside">
                    <li>Try refreshing the page</li>
                    <li>Go back to the home page</li>
                    <li>Check your internet connection</li>
                    <li>Contact support if the problem persists</li>
                  </ul>
                </div>
              </CardContent>

              <CardFooter className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={this.handleReset}
                  className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Try Again
                </Button>
                <Button
                  onClick={this.handleGoHome}
                  variant="outline"
                  className="w-full sm:w-auto"
                >
                  <Home className="w-4 h-4 mr-2" />
                  Go to Home
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}