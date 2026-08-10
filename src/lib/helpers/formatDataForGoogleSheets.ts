import { formatDate } from '@/lib/helpers/dateTime';
import { RegisterFormData } from '@/lib/services/google-sheets';

export function formatDataForGoogleSheets(data: Record<string, unknown>): RegisterFormData {
  const genderValue = (data.gender as string) || '';

  return {
    firstName: (data.firstName as string) || '',
    lastName: (data.lastName as string) || '',
    birthday: data.birthday ? formatDate(data.birthday as string) : '',
    address: (data.address as string) || '',
    postalCode: (data.postalCode as string) || '',
    city: (data.city as string) || '',
    telephoneNumber: (data.telephoneNumber as string) || '',
    email: (data.email as string) || '',
    gender: (['m', 'v', 'x'].includes(genderValue)
      ? genderValue
      : '') as RegisterFormData['gender'],
    comments: (data.comments as string) || '',
    workingYear: (data.workingYear as string) || '',
    memberGroup: (data.memberGroup as string) || '',
    timestamp: new Date()
      .toLocaleString('nl-BE', { timeZone: 'Europe/Brussels' })
      .replace('T', ' '),
  };
}

export function validateGoogleSheetsData(data: RegisterFormData): boolean {
  const requiredFields = ['firstName', 'lastName', 'email', 'gender'];

  return requiredFields.every((field) => {
    const value = data[field as keyof RegisterFormData];
    return value !== undefined && value !== null && value !== '';
  });
}
