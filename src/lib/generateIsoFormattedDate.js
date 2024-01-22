export function generateIsoFormattedDate(normalDate) {
  // Convert the date string to a JavaScript Date object
  const dateObject = new Date(normalDate);
  // Formate the date as a string in ISO 8601 formate
  const isoFormattedDate = dateObject.toISOString();

  return isoFormattedDate;
}
