let userInfo = localStorage.getItem("user") || localStorage.getItem("user");
userInfo = JSON.parse(userInfo);

export default function formatDate(createdAt) {
  const date = new Date(createdAt);
  const formattedDate = new Intl.DateTimeFormat(undefined, {
    month: "numeric",
    day: "numeric",
    // year: "2-digit",
    year: "numeric",
    timeZone: userInfo?.timeZone || "UTC", // Default to UTC if timezone is
    // hour: "numeric",
    // minute: "numeric",
    // hour12: true,
  }).format(date);

  return formattedDate;
}
