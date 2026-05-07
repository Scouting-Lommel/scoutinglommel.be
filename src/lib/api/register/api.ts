import { generateApiQuery } from '@/lib/api';
import type { RegisterMemberMutation, RegisterMemberMutationVariables } from '@/types/generated/Graphql';
import { Enum_Member_Gender } from '@/types/generated/Graphql';
import {
  formatDataForGoogleSheets,
  validateGoogleSheetsData,
} from '@/lib/helpers/formatDataForGoogleSheets';
import { appendToGoogleSheet } from '@/lib/services/google-sheets';
import { REGISTER_MEMBER_MUTATION } from './mutations';

type RegisterMemberProps = {
  firstName: string;
  lastName: string;
  birthday: Date;
  memberGroup?: string;
  gender: 'm' | 'v' | 'x';
  telephoneNumber: string;
  email: string;
  address: string;
  postalCode: string;
  city: string;
  comments: string;
  workingYear: string;
};

export function registerMember({
  firstName,
  lastName,
  birthday,
  memberGroup,
  gender,
  telephoneNumber,
  email,
  address,
  postalCode,
  city,
  comments,
  workingYear,
}: RegisterMemberProps): Promise<RegisterMemberMutation> {
  return generateApiQuery<RegisterMemberMutation, RegisterMemberMutationVariables>({
    variables: {
      firstName,
      lastName,
      birthday: birthday instanceof Date ? birthday.toISOString().split('T')[0] : birthday,
      gender: gender as Enum_Member_Gender,
      telephoneNumber,
      email,
      address,
      postalCode,
      city,
      comments,
      workingYear,
    },
    query: REGISTER_MEMBER_MUTATION,
    operation: 'mutation',
  });
}

export async function registerMemberWithGoogleSheets(memberData: {
  firstName: string;
  lastName: string;
  birthday: Date;
  memberGroup?: string;
  gender: 'm' | 'v' | 'x';
  telephoneNumber: string;
  email: string;
  address: string;
  postalCode: string;
  city: string;
  comments: string;
  workingYear: string;
}): Promise<void> {
  try {
    // First, register the member with the existing API
    await registerMember(memberData);

    // Then, format and validate data for Google Sheets
    const googleSheetsData = formatDataForGoogleSheets(memberData);

    if (!validateGoogleSheetsData(googleSheetsData)) {
      throw new Error('Invalid data for Google Sheets');
    }

    // Save to Google Sheets
    await appendToGoogleSheet(googleSheetsData);
  } catch (error) {
    console.error('Error in registerMemberWithGoogleSheets:', error);
    throw error;
  }
}
