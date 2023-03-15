export function convertToSplitedTime(seconds: any) {
  const date = new Date(seconds * 1000);
  const hours = date.getUTCHours().toString().padStart(2, "0");
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");
  const secondsFormatted = date.getUTCSeconds().toString().padStart(2, "0");

  const formattedTime = `${hours}:${minutes}:${secondsFormatted}`;

  return formattedTime;
}
