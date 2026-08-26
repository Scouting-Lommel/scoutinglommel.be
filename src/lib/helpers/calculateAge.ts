const parseLocalDate = (dateString: string): Date | null => {
  const [year, month, day] = dateString.split('-').map(Number);

  if (!year || !month || !day) return null;

  const date = new Date(year, month - 1, day);

  if (
    Number.isNaN(date.getTime()) ||
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }

  return date;
};

const calculateAge = (dateOfBirth?: string | null): number | null => {
  if (!dateOfBirth) return null;

  const birthDate = parseLocalDate(dateOfBirth);
  if (!birthDate) return null;

  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();

  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
    age -= 1;
  }

  return age;
};

export default calculateAge;
