import toast from "react-hot-toast";

/**
 * Custom useToast hook — unified toast handler for consistent UX
 * Works across the app for both success/error/info notifications.
 */

export const useToast = () => {
  const showSuccess = (message: string) =>
    toast.success(message, {
      icon: "✅",
      duration: 4000,
      style: { background: "#0f766e", color: "#fff" },
    });

  const showError = (message: string) =>
    toast.error(message, {
      icon: "❌",
      duration: 4000,
      style: { background: "#b91c1c", color: "#fff" },
    });

  const showInfo = (message: string) =>
    toast(message, {
      icon: "ℹ️",
      duration: 3000,
      style: { background: "#334155", color: "#fff" },
    });

  return { showSuccess, showError, showInfo };
};
