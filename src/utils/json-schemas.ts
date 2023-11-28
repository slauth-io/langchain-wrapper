import { zodToJsonSchema } from 'zod-to-json-schema';
import ZodSchemas from './zod-types';

export default {
  aws: {
    statementsOpenAIResultSchema: zodToJsonSchema(
      ZodSchemas.aws.StatementsOpenAIResultSchema
    ),
    policyDocumentsOpenAIResultSchema: zodToJsonSchema(
      ZodSchemas.aws.PolicyDocumentsOpenAIResultSchema
    ),
  },
  gcp: {
    permissionsOpenAIResultSchema: zodToJsonSchema(
      ZodSchemas.gcp.GCPPermissionsOpenAIResultSchema
    ),
  },
};
