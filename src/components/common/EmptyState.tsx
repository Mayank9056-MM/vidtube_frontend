import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Inbox,
  Search,
  FileQuestion,
  Plus,
  RefreshCw,
} from "lucide-react";

interface EmptyStateProps {
  icon?: React.ComponentType<{ className?: string }>;
  title?: string;
  description?: string;
  actionLabel?: string;
  secondaryActionLabel?: string;
  onAction?: () => void;
  onSecondaryAction?: () => void;
  variant?: "default" | "search" | "error" | "create";
}

export default function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  secondaryActionLabel,
  onAction,
  onSecondaryAction,
  variant = "default",
}: EmptyStateProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setIsDarkMode(document.documentElement.classList.contains("dark"));
  }, []);

  // Default configurations based on variant
  const variants = {
    default: {
      icon: Inbox,
      title: "No items found",
      description: "There's nothing here yet. Start by adding your first item.",
      actionLabel: "Add Item",
      gradient: "from-slate-500 to-slate-600",
    },
    search: {
      icon: Search,
      title: "No results found",
      description: "We couldn't find anything matching your search. Try different keywords.",
      actionLabel: "Clear Search",
      gradient: "from-blue-500 to-purple-600",
    },
    error: {
      icon: FileQuestion,
      title: "Something's not right",
      description: "We had trouble loading this content. Please try again.",
      actionLabel: "Retry",
      gradient: "from-orange-500 to-red-600",
    },
    create: {
      icon: Plus,
      title: "Get started",
      description: "Create your first item to begin your journey.",
      actionLabel: "Create New",
      gradient: "from-green-500 to-emerald-600",
    },
  };

  const config = variants[variant];
  const DisplayIcon = Icon || config.icon;
  const displayTitle = title || config.title;
  const displayDescription = description || config.description;
  const displayActionLabel = actionLabel || config.actionLabel;

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4 transition-colors duration-300">
        <Card className="w-full max-w-md shadow-2xl">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-center mb-4">
              <div className={`w-20 h-20 bg-gradient-to-br ${config.gradient} rounded-lg flex items-center justify-center shadow-lg`}>
                <DisplayIcon className="w-10 h-10 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-center">
              {displayTitle}
            </CardTitle>
            <CardDescription className="text-center text-base">
              {displayDescription}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
              <div className="flex flex-col items-center space-y-3">
                <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div className={`h-full w-0 bg-gradient-to-r ${config.gradient} rounded-full`}></div>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 text-center">
                  {variant === "create" && "Your workspace is ready for new content"}
                  {variant === "search" && "Try adjusting your filters or search terms"}
                  {variant === "error" && "This is usually a temporary issue"}
                  {variant === "default" && "Start adding content to see it here"}
                </p>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-3">
            {onAction && (
              <Button
                onClick={onAction}
                className={`w-full bg-gradient-to-r ${config.gradient} hover:opacity-90 text-white font-medium transition-opacity`}
              >
                {variant === "error" ? (
                  <RefreshCw className="w-4 h-4 mr-2" />
                ) : variant === "create" ? (
                  <Plus className="w-4 h-4 mr-2" />
                ) : null}
                {displayActionLabel}
              </Button>
            )}
            {onSecondaryAction && secondaryActionLabel && (
              <Button
                onClick={onSecondaryAction}
                variant="outline"
                className="w-full"
              >
                {secondaryActionLabel}
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}