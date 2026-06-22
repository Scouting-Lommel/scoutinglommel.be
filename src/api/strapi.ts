import { DocumentNode, print } from 'graphql';
import { getCacheOptions } from '@/lib/api/cache';

type GraphQLError = {
  message: string;
  extensions?: { code?: string };
};

const fetchAPI = async (
  query: DocumentNode,
  variables?: unknown,
  operation: 'query' | 'mutation' = 'query',
) => {
  let headers: Record<string, string>;
  let cacheOptions: ReturnType<typeof getCacheOptions> | { cache: 'no-store' };

  switch (operation) {
    case 'mutation': {
      const token = process.env.STRAPI_API_TOKEN;
      if (!token) {
        throw new Error('STRAPI_API_TOKEN is required for GraphQL mutations');
      }
      headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };
      cacheOptions = { cache: 'no-store' };
      break;
    }
    default: {
      const token = process.env.STRAPI_API_TOKEN;
      headers = {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      };

      // Determine cache strategy based on query content
      const queryString = print(query);
      const isStaticData =
        queryString.includes('generalData') ||
        queryString.includes('groups') ||
        queryString.includes('rentalLocations');
      const isUserData = queryString.includes('activities') || queryString.includes('files');

      if (isStaticData) {
        cacheOptions = getCacheOptions('STATIC');
      } else if (isUserData) {
        cacheOptions = getCacheOptions('USER');
      } else {
        cacheOptions = getCacheOptions('DYNAMIC');
      }
    }
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_BACKEND_URL}/graphql`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query: print(query),
      variables,
    }),
    ...cacheOptions,
  });

  const json = await res.json();

  if (json.errors) {
    const isAuthError = json.errors.some(
      (error: GraphQLError) =>
        error.extensions?.code === 'FORBIDDEN' ||
        error.message?.includes('Forbidden access') ||
        error.message?.includes('Unauthorized'),
    );

    if (isAuthError) {
      console.warn(`GraphQL auth error (${res.status}):`, json.errors);
      return {};
    }

    console.error('GraphQL Errors:', json.errors);
    const errorMessage = json.errors.map((error: GraphQLError) => error.message).join(', ');
    throw new Error(`GraphQL Error: ${errorMessage}`);
  }

  if (!res.ok) {
    if (res.status === 401 || res.status === 403) {
      console.warn(`HTTP auth error: ${res.status} ${res.statusText}`);
      return {};
    }

    console.error('HTTP Error:', res.status, res.statusText);
    throw new Error(`HTTP Error: ${res.status} ${res.statusText}`);
  }

  return json.data;
};

export default fetchAPI;
