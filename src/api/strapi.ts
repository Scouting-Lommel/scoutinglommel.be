import { DocumentNode, print } from 'graphql';

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

  // Never cache CMS responses: caching left data stale for up to 7 days because
  // the Data Cache engages before headers() marks the route dynamic, and the
  // revalidate webhook could not reliably invalidate those entries.
  const cacheOptions = { cache: 'no-store' as const };

  switch (operation) {
    case 'mutation': {
      const token = process.env.STRAPI_MUTATION_API_TOKEN;
      if (!token) {
        throw new Error('STRAPI_MUTATION_API_TOKEN is required for GraphQL mutations');
      }
      authHeaders = { Authorization: `Bearer ${token}` };
      break;
    }
    default: {
      const token = process.env.STRAPI_API_TOKEN;
      authHeaders = token ? { Authorization: `Bearer ${token}` } : {};
    }
  }

  const request = async (withAuth: boolean) =>
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
    res = await request(false);
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
