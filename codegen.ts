import type { CodegenConfig } from '@graphql-codegen/cli';

const schemaUrl = process.env.STRAPI_SCHEMA_URL;

const config: CodegenConfig = {
  overwrite: true,
  schema: schemaUrl,
  documents: ['src/**/*.{ts,tsx}', 'src/**/*.gql'],
  ignoreNoDocuments: true,
  generates: {
    'src/types/generated/Graphql.ts': {
      plugins: ['typescript', 'typescript-operations', 'typed-document-node'],
      config: {
        scalars: {
          Date: 'string',
          DateTime: 'string',
          Time: 'string',
          JSON: 'unknown',
          Upload: 'File',
          BlocksContent: 'unknown',
          Long: 'number',
        },
        useTypeImports: true,
        skipTypename: true,
        defaultScalarType: 'unknown',
      },
    },
  },
};

export default config;
