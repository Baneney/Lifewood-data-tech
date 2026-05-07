export function calculateBday(dob: string | Date): string {
  const today = new Date();
  const birth = new Date(dob);
  const birthdayThisYear = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
  const age = today.getFullYear() - birth.getFullYear() - (today < birthdayThisYear ? 1 : 0);
  return `${age} years old`;
}
