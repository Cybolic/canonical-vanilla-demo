export const format = (date: Date, formatString: string): string => {
  const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
  const month = new Intl.DateTimeFormat('en', { month: 'long' }).format(date);
  const day = new Intl.DateTimeFormat('en', { day: 'numeric' }).format(date);
  // Note: the following is a naive implementation of a format string
  return formatString
    .replace('%Y', year)
    .replace('%B', month)
    .replace('%d', day);
};
