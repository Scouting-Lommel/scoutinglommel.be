import 'dotenv/config';
import { getIntrospectionQuery, buildClientSchema, printSchema } from 'graphql';
import { writeFileSync } from 'fs';

const backendUrl = process.env.NEXT_PUBLIC_APP_BACKEND_URL;
const token = process.env.STRAPI_API_TOKEN;

if (!backendUrl) {
  console.error('NEXT_PUBLIC_APP_BACKEND_URL is not set');
  process.exit(1);
}

async function fetchSchema() {
  const res = await fetch(new URL('/graphql', backendUrl).toString(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({ query: getIntrospectionQuery() }),
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch schema: ${res.status} ${res.statusText}`);
  }

  const { data, errors } = await res.json();

  if (errors) {
    throw new Error(`Introspection error: ${errors.map((e: any) => e.message).join(', ')}`);
  }

  // Build schema from introspection and print to SDL.
  // printSchema strips custom directive definitions that Strapi v5
  // includes and which codegen cannot parse.
  const schema = buildClientSchema(data);
  const sdl = printSchema(schema);

  writeFileSync('./schema.graphql', sdl, 'utf-8');
  console.log('✅ schema.graphql written');
}

fetchSchema().catch((err) => {
  console.error(err);
  process.exit(1);
});
