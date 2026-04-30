export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

export const formatTime = (dateString) => {
  return new Date(dateString).toLocaleTimeString("nl-NL", {
    hour: "2-digit",
    minute: "2-digit",
  });
};
