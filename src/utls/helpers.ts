export const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num?.toString();
  };

   export const formatDuration = (seconds) => {
    if (!seconds) return "0:00";

    const sec = Math.floor(seconds % 60);
    const min = Math.floor((seconds / 60) % 60);
    const hrs = Math.floor(seconds / 3600);

    const s = sec < 10 ? `0${sec}` : sec;
    const m = min < 10 ? `0${min}` : min;

    if (hrs > 0) {
      const h = hrs < 10 ? `0${hrs}` : hrs;
      return `${h}:${m}:${s}`;
    }

    return `${m}:${s}`;
  };

    export const formatDate = (date) => {
    if (!date) return "";

    const d = new Date(date);
    return d.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };
