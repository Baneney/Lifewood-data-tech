export const formatToDBDate = (date: Date | null): string | null => {
  if (!date) return null;
  
  // Handles timezone offset to ensure the date doesn't "shift" by a day
  const offset = date.getTimezoneOffset();
  const adjustedDate = new Date(date.getTime() - (offset * 60 * 1000));
  
  return adjustedDate.toISOString().split('T')[0];
};