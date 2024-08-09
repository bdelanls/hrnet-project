/**
 * Formats a date string according to the user's locale and the specified options.
 *
 * @param {string} dateString - The date string to format (in ISO 8601 format).
 * @returns {string} The formatted date string based on the user's locale.
 */
export const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  };
  return new Date(dateString).toLocaleDateString(navigator.language, options);
};
