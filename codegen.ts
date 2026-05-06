import 'dotenv/config';
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: `${process.env.NEXT_PUBLIC_APP_BACKEND_URL}/graphql`,
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
