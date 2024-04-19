import { format } from 'date-fns';

// Function to convert month number to month name
function getMonthName(monthIndex: number, locale = undefined) {
  // monthIndex should be from 0 (January) to 11 (December)
  const arbitraryYear = 2000; // The year is arbitrary and can be any valid year
  const date = new Date(arbitraryYear, monthIndex); // Year is arbitrary
  return format(date, 'MMMM', { locale });
}

export { getMonthName };
