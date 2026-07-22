import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { getErrorMessage } from '@/lib/helpers/getErrorMessage';
import { getOrganisationRole } from '@/lib/helpers/getOrganisationRole';
import { isValidOrgUnitPath } from '@/lib/helpers/getOrganisationRole';
import { getSiteUrl } from '@/lib/helpers/getSiteUrl';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
      authorization: {
        params: {
          hd: 'scoutinglommel.be',
        },
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: '/inloggen',
  },

  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      const { name, email, picture, ...tokenProps } = token;

      // If no email, return session without orgUnit/role
      if (!token.email) {
        console.error('Session callback: Token email is missing');
        return {
          ...session,
          ...tokenProps,
        };
      }

      try {
        const siteUrl = await getSiteUrl();
        const response = await fetch(
          `${siteUrl}/api/auth/get-org-unit?email=${encodeURIComponent(token.email)}`,
        );

        // Check if response is OK before parsing
        if (!response.ok) {
          console.error(
            `Session callback: API response not OK: ${response.status} ${response.statusText}`,
          );
          return {
            ...session,
            ...tokenProps,
          };
        }

        // Validate content type
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          console.error(`Session callback: Unexpected content type: ${contentType}`);
          return {
            ...session,
            ...tokenProps,
          };
        }

        const data = await response.json();

        // Validate orgUnitPath exists and is valid
        if (!data?.orgUnitPath || !data.orgUnitPath.startsWith('/')) {
          console.error(`Session callback: Invalid orgUnitPath: ${data?.orgUnitPath}`);
          return {
            ...session,
            ...tokenProps,
          };
        }

        if (!isValidOrgUnitPath(data.orgUnitPath)) {
          console.error(
            `Session callback: Invalid orgUnitPath: ${data.orgUnitPath} is not a valid OrganisationRoles`,
          );
          return {
            ...session,
            ...tokenProps,
          };
        }

        return {
          ...session,
          ...tokenProps,
          orgUnit: data.orgUnitPath,
          role: getOrganisationRole(data.orgUnitPath),
        };
      } catch (error: unknown) {
        const errorMessage = getErrorMessage(error);
        console.error(`Session callback: Error fetching org unit data: ${errorMessage}`, error);
        // Return session without orgUnit/role on error - user can still access basic features
        return {
          ...session,
          ...tokenProps,
        };
      }
    },
  },
};
