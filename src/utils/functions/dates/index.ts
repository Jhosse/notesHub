export const dateFormatting = (date: string): string => {
  const inputDate = new Date(date);

  // Catch invalid date
  if (isNaN(inputDate.getTime())) return "";

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "2-digit",
  };

  return inputDate.toLocaleDateString("en-US", options); // DateTimeFormatOptions
};
