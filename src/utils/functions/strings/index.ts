export const splitCamelCase = (str: string): string => {
  return str.replace(/([a-z])([A-Z])/g, "$1 $2");
};

export const stringCapitalization = (str: string) => {
  return str.trim().charAt(0).toUpperCase() + str.trim().slice(1);
};

export const truncateText = (text: string, maxLength: number = 300): string => {
  if (text.length > maxLength) {
    const trimmedText = text.substring(0, maxLength);
    const lastSpaceIndex = trimmedText.lastIndexOf(" ");
    return lastSpaceIndex !== -1
      ? trimmedText.substring(0, lastSpaceIndex) + "..."
      : trimmedText + "...";
  }
  return text;
};
