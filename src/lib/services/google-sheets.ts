import { JWT } from 'google-auth-library';
import { GOOGLE_SHEETS_CONFIG, COLUMN_ORDER } from '@/lib/config/google-sheets-config';

async function getSheetsAccessToken(): Promise<string> {
  if (!process.env.GOOGLE_SHEETS_CLIENT_EMAIL || !process.env.GOOGLE_SHEETS_PRIVATE_KEY) {
    throw new Error('Google Sheets credentials not configured');
  }

  const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY.replace(/\\n/g, '\n');
  const impersonatedUser = process.env.GOOGLE_SHEETS_IMPERSONATE_EMAIL;

  const auth = new JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    ...(impersonatedUser ? { subject: impersonatedUser } : {}),
  });

  await auth.authorize();
  const tokenResponse = await auth.getAccessToken();
  const accessToken = typeof tokenResponse === 'string' ? tokenResponse : tokenResponse?.token;
  if (!accessToken) {
    throw new Error('Failed to obtain access token for Google Sheets API');
  }

  return accessToken;
}

export interface RegisterFormData {
  firstName: string;
  lastName: string;
  birthday: string;
  address: string;
  postalCode: string;
  city: string;
  telephoneNumber: string;
  email: string;
  gender: 'm' | 'v' | 'x';
  comments: string;
  workingYear: string;
  memberGroup?: string;
  timestamp: string;
}

function getSpreadsheetId(): string {
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
  if (!spreadsheetId) {
    throw new Error('Google Sheets spreadsheet ID not configured');
  }
  return spreadsheetId;
}

function getBaseRange(): string {
  return `${GOOGLE_SHEETS_CONFIG.SHEET_NAME}!${GOOGLE_SHEETS_CONFIG.RANGE}`;
}

function getHeaderRange(headersLength: number): string {
  return `${GOOGLE_SHEETS_CONFIG.SHEET_NAME}!A1:${String.fromCharCode(65 + headersLength - 1)}1`;
}

async function callSheetsApi(accessToken: string, endpoint: string, init: RequestInit = {}) {
  const response = await fetch(`https://sheets.googleapis.com/v4${endpoint}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      ...(init.headers || {}),
    },
  });

  console.dir(response, { depth: null });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Google Sheets API error ${response.status}: ${body || response.statusText}`);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export async function appendToGoogleSheet(data: RegisterFormData): Promise<void> {
  try {
    const spreadsheetId = getSpreadsheetId();
    const accessToken = await getSheetsAccessToken();

    // Convert data to array format for Google Sheets using the column order
    const values = [
      COLUMN_ORDER.map((key) => {
        const value = data[key];
        if (key === 'gender') {
          return value === 'm' ? 'M' : value === 'v' ? 'V' : 'X';
        }
        return value || '';
      }),
    ];

    const encodedRange = encodeURIComponent(getBaseRange());
    await callSheetsApi(
      accessToken,
      `/spreadsheets/${spreadsheetId}/values/${encodedRange}:append?valueInputOption=RAW`,
      {
        method: 'POST',
        body: JSON.stringify({
          values,
        }),
      },
    );
  } catch (error) {
    const isAuthError =
      (error instanceof Error && error.message?.includes('Login Required')) ||
      (typeof error === 'object' &&
        error !== null &&
        ((error as { status?: number }).status === 401 ||
          (error as { code?: number }).code === 401));

    if (isAuthError) {
      const serviceAccountEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
      const impersonatedUser = process.env.GOOGLE_SHEETS_IMPERSONATE_EMAIL;
      throw new Error(
        `Google Sheets authentication failed (401). Service account "${serviceAccountEmail}" may need direct sheet access or delegated access via "${impersonatedUser ?? 'no impersonated user configured'}".`,
      );
    }

    throw error;
  }
}

export async function getSheetData(): Promise<any[]> {
  try {
    const spreadsheetId = getSpreadsheetId();
    const accessToken = await getSheetsAccessToken();
    const encodedRange = encodeURIComponent(getBaseRange());
    const response = (await callSheetsApi(
      accessToken,
      `/spreadsheets/${spreadsheetId}/values/${encodedRange}`,
      { method: 'GET' },
    )) as { values?: any[] };

    return response.values || [];
  } catch (error) {
    console.error('Error getting sheet data:', error);
    throw error;
  }
}

export async function createSheetHeaders(): Promise<void> {
  try {
    const spreadsheetId = getSpreadsheetId();
    const accessToken = await getSheetsAccessToken();
    const headers = Object.values(GOOGLE_SHEETS_CONFIG.COLUMNS);
    const encodedRange = encodeURIComponent(getHeaderRange(headers.length));

    await callSheetsApi(
      accessToken,
      `/spreadsheets/${spreadsheetId}/values/${encodedRange}?valueInputOption=RAW`,
      {
        method: 'PUT',
        body: JSON.stringify({
          values: [headers],
        }),
      },
    );
  } catch (error) {
    console.error('Error creating sheet headers:', error);
    throw error;
  }
}
