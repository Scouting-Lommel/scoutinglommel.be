import 'dotenv/config';
import type { CodegenConfig } from '@graphql-codegen/cli';

const sharedConfig = {
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
};

const config: CodegenConfig = {
  overwrite: true,
  schema: './schema.graphql',
  documents: ['src/**/*.{ts,tsx}', 'src/**/*.gql', '!src/types/generated/**'],
  ignoreNoDocuments: true,
  generates: {
    'src/types/generated/Schema.ts': {
      plugins: ['typescript'],
      config: sharedConfig,
    },
    'src/types/generated/Graphql.ts': {
      plugins: [
        { add: { content: "export * from './Schema';" } },
        'typescript-operations',
        'typed-document-node',
      ],
      config: {
        ...sharedConfig,
        importSchemaTypesFrom: 'src/types/generated/Schema',
      },
    },
  },
};

export default config;
