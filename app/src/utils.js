import { days, months } from "./constants";

const formatDate = function (dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDay();

  return `${days[day]} ${months[month]} ${year}`;
};

const getDateDiff = function (date) {
  const difference = new Date(date).getTime() - Date.now();
  return difference;
};

const formatDiff = function (diff, format) {
  if (diff < 0) return;

  if (format === "days") {
    return Math.trunc(diff / (1000 * 60 * 60 * 60));
  }
};

export { formatDate, getDateDiff, formatDiff };
