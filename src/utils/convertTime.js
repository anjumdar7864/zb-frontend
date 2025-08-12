export default function getTotalMinutes(time) {
  let result = time.hours * 60 + time.minutes;
  return result;
}
