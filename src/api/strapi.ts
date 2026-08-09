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
  let authHeaders: Record<string, string>;
  let cacheOptions: ReturnType<typeof getCacheOptions> | { cache: 'no-store' };

  switch (operation) {
    case 'mutation': {
      const token = process.env.STRAPI_MUTATION_API_TOKEN;
      if (!token) {
        throw new Error('STRAPI_MUTATION_API_TOKEN is required for GraphQL mutations');
      }
      authHeaders = { Authorization: `Bearer ${token}` };
      cacheOptions = { cache: 'no-store' };
      break;
    }
    default: {
      const token = process.env.STRAPI_API_TOKEN;
      authHeaders = token ? { Authorization: `Bearer ${token}` } : {};

      // Determine cache strategy based on query content.
      // User data takes precedence over static data so mixed queries
      // (e.g. groups + activities) do not get cached as static.
      const queryString = print(query);
      const isUserData = queryString.includes('activities') || queryString.includes('files');
      const isStaticData =
        queryString.includes('generalData') ||
        queryString.includes('groups') ||
        queryString.includes('rentalLocations');

      if (isUserData) {
        cacheOptions = getCacheOptions('USER');
      } else if (isStaticData) {
        cacheOptions = getCacheOptions('STATIC');
      } else {
        cacheOptions = getCacheOptions('DYNAMIC');
      }
    }
  }

  const request = async (withAuth: boolean, bypassCache = false) =>
    fetch(`${process.env.NEXT_PUBLIC_APP_BACKEND_URL}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(withAuth ? authHeaders : {}),
      },
      body: JSON.stringify({
        query: print(query),
        variables,
      }),
      ...cacheOptions,
      ...(bypassCache ? { cache: 'no-store' as const } : {}),
    });

  let res = await request(Object.keys(authHeaders).length > 0);
  let json = await res.json();

  const isAuthFailure =
    res.status === 401 ||
    res.status === 403 ||
    (json.errors ?? []).some(
      (error: GraphQLError) =>
        error.extensions?.code === 'FORBIDDEN' ||
        error.message?.includes('Forbidden access') ||
        error.message?.includes('Unauthorized'),
    );

  if (isAuthFailure && operation === 'query' && authHeaders.Authorization) {
    console.warn(
      `GraphQL auth error (${res.status}), retrying as public request:`,
      json.errors ?? 'HTTP authentication failure',
    );
    res = await request(false, true);
    json = await res.json();
  }

  if (json.errors) {
    const errorMessage = json.errors.map((error: GraphQLError) => error.message).join(', ');

    if (isAuthFailure) {
      if (operation === 'query') {
        console.warn(`GraphQL auth error (${res.status}):`, json.errors);
        return {};
      }
      throw new Error(`GraphQL Error: ${errorMessage}`);
    }

    console.error('GraphQL Errors:', json.errors);
    throw new Error(`GraphQL Error: ${errorMessage}`);
  }

  if (!res.ok) {
    if (res.status === 401 || res.status === 403) {
      if (operation === 'query') {
        console.warn(`HTTP auth error: ${res.status} ${res.statusText}`);
        return {};
      }
      throw new Error(`HTTP Error: ${res.status} ${res.statusText}`);
    }

    console.error('HTTP Error:', res.status, res.statusText);
    throw new Error(`HTTP Error: ${res.status} ${res.statusText}`);
  }

  return json.data;
};

export default fetchAPI;
