export default function formatDateToRelative(inputDateStr) {
  const inputDate = new Date(inputDateStr);

  const currentDate = new Date();

  const timeDifference = currentDate - inputDate;

  const timeUnits = [
    { unit: "year", ms: 31536000000 },
    { unit: "month", ms: 2592000000 },
    { unit: "day", ms: 86400000 },
    { unit: "hour", ms: 3600000 },
    { unit: "minute", ms: 60000 },
    { unit: "second", ms: 1000 },
  ];

  for (const { unit, ms } of timeUnits) {
    if (timeDifference >= ms) {
      const unitCount = Math.floor(timeDifference / ms);
      return `${unitCount} ${unit}${
        unitCount !== 1 ? "s" : ""
      } ago (${inputDateStr})`;
    }
  }

  return `Just now (${inputDateStr})`;
}
